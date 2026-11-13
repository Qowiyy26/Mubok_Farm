import { createServer } from 'node:http';
import { createHash, randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scrypt = promisify(scryptCallback);
const root = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(root, 'data');
const dataFile = path.join(dataDir, 'farm-data.json');
const distDir = path.join(root, 'dist');
const sessions = new Map();
const loginAttempts = new Map();
const SESSION_MS = 8 * 60 * 60 * 1000;

async function readStore() {
  try {
    return JSON.parse(await readFile(dataFile, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return { admin: null, products: [] };
  }
}

async function saveStore(store) {
  await mkdir(dataDir, { recursive: true });
  const temp = `${dataFile}.${randomUUID()}.tmp`;
  await writeFile(temp, JSON.stringify(store, null, 2), { mode: 0o600 });
  await rename(temp, dataFile);
}

function sendJson(res, status, value, extraHeaders = {}) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    ...extraHeaders,
  });
  res.end(JSON.stringify(value));
}

async function readJson(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 32_000) throw Object.assign(new Error('Request is too large.'), { status: 413 });
  }
  try { return JSON.parse(body || '{}'); }
  catch { throw Object.assign(new Error('Invalid JSON.'), { status: 400 }); }
}

function cookieValue(req, name) {
  const pair = (req.headers.cookie || '').split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return pair ? decodeURIComponent(pair.slice(name.length + 1)) : '';
}

function getSession(req) {
  const token = cookieValue(req, 'mubok_admin');
  const expires = sessions.get(token);
  if (!expires || expires < Date.now()) {
    sessions.delete(token);
    return '';
  }
  return token;
}

function limitLogin(ip) {
  const attempts = (loginAttempts.get(ip) || []).filter((stamp) => Date.now() - stamp < 10 * 60 * 1000);
  if (attempts.length >= 8) return false;
  attempts.push(Date.now());
  loginAttempts.set(ip, attempts);
  return true;
}

function validImageUrl(value) {
  if (!value) return true;
  if (typeof value !== 'string' || value.length > 1000) return false;
  if (value.startsWith('/')) return !value.startsWith('//') && !value.includes('..');
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}

function cleanProduct(input, existing = {}) {
  const name = String(input.name || '').trim();
  const category = String(input.category || 'Other').trim();
  const description = String(input.description || '').trim();
  const unit = String(input.unit || '').trim();
  const price = input.price === '' || input.price == null ? null : Number(input.price);
  const imageUrl = String(input.imageUrl || '').trim();
  const categories = ['Crops', 'Livestock', 'Animal products', 'Other'];
  if (!name || name.length > 80) throw Object.assign(new Error('Enter a product name (up to 80 characters).'), { status: 400 });
  if (!categories.includes(category)) throw Object.assign(new Error('Choose a valid category.'), { status: 400 });
  if (description.length > 500 || unit.length > 40) throw Object.assign(new Error('Product details are too long.'), { status: 400 });
  if (price !== null && (!Number.isFinite(price) || price < 0 || price > 1_000_000_000)) throw Object.assign(new Error('Enter a valid price.'), { status: 400 });
  if (!validImageUrl(imageUrl)) throw Object.assign(new Error('Use an HTTPS image link or a safe local path.'), { status: 400 });
  return {
    ...existing,
    name,
    category,
    description,
    unit,
    price,
    imageUrl,
    available: input.available !== false,
    updatedAt: new Date().toISOString(),
  };
}

async function verifyPassword(password, admin) {
  const hash = await scrypt(password, Buffer.from(admin.salt, 'hex'), 64);
  return timingSafeEqual(hash, Buffer.from(admin.hash, 'hex'));
}

async function serveStatic(req, res, pathname) {
  if (!existsSync(distDir)) return sendJson(res, 404, { error: 'Not found.' });
  const requested = pathname === '/' ? 'index.html' : decodeURIComponent(pathname.slice(1));
  const file = path.resolve(distDir, requested);
  if (!file.startsWith(`${distDir}${path.sep}`) && file !== path.join(distDir, 'index.html')) return sendJson(res, 403, { error: 'Forbidden.' });
  let target = file;
  if (!existsSync(target)) target = path.join(distDir, 'index.html');
  try {
    const body = await readFile(target);
    const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    res.end(body);
  } catch { sendJson(res, 404, { error: 'Not found.' }); }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const { pathname } = url;
    if (pathname.startsWith('/api/') && req.headers.origin) {
      const origin = new URL(req.headers.origin);
      if (origin.host !== req.headers.host) return sendJson(res, 403, { error: 'Request origin is not allowed.' });
    }
    if (pathname === '/api/health' && req.method === 'GET') return sendJson(res, 200, { ok: true });
    if (pathname === '/api/admin/status' && req.method === 'GET') {
      const store = await readStore();
      return sendJson(res, 200, { configured: Boolean(store.admin), authenticated: Boolean(getSession(req)) });
    }
    if (pathname === '/api/products' && req.method === 'GET') {
      const store = await readStore();
      const products = store.products.filter((product) => product.available).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      return sendJson(res, 200, products);
    }
    if (pathname === '/api/admin/setup' && req.method === 'POST') {
      const store = await readStore();
      if (store.admin) return sendJson(res, 409, { error: 'Admin account is already set up. Sign in instead.' });
      const expectedKey = process.env.ADMIN_SETUP_KEY || '';
      if (expectedKey.length < 24) return sendJson(res, 503, { error: 'The owner must set ADMIN_SETUP_KEY on the server before creating the first admin account.' });
      const { password, setupKey } = await readJson(req);
      const suppliedHash = createHash('sha256').update(String(setupKey || '')).digest();
      const expectedHash = createHash('sha256').update(expectedKey).digest();
      if (!timingSafeEqual(suppliedHash, expectedHash)) return sendJson(res, 403, { error: 'The one-time setup key is incorrect.' });
      if (typeof password !== 'string' || password.length < 12 || password.length > 200) return sendJson(res, 400, { error: 'Choose a password with at least 12 characters.' });
      const salt = randomBytes(16);
      store.admin = { salt: salt.toString('hex'), hash: (await scrypt(password, salt, 64)).toString('hex') };
      store.products ||= [];
      await saveStore(store);
      const token = randomBytes(32).toString('base64url');
      sessions.set(token, Date.now() + SESSION_MS);
      const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
      return sendJson(res, 201, { ok: true }, { 'Set-Cookie': `mubok_admin=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=28800${secure}` });
    }
    if (pathname === '/api/admin/login' && req.method === 'POST') {
      const ip = req.socket.remoteAddress || 'unknown';
      if (!limitLogin(ip)) return sendJson(res, 429, { error: 'Too many sign-in attempts. Try again in 10 minutes.' });
      const store = await readStore();
      if (!store.admin) return sendJson(res, 409, { error: 'Create the first admin password before signing in.' });
      const { password } = await readJson(req);
      if (typeof password !== 'string' || !(await verifyPassword(password, store.admin))) return sendJson(res, 401, { error: 'Password is incorrect.' });
      loginAttempts.delete(ip);
      const token = randomBytes(32).toString('base64url');
      sessions.set(token, Date.now() + SESSION_MS);
      const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
      return sendJson(res, 200, { ok: true }, { 'Set-Cookie': `mubok_admin=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=28800${secure}` });
    }
    if (pathname === '/api/admin/logout' && req.method === 'POST') {
      sessions.delete(getSession(req));
      return sendJson(res, 200, { ok: true }, { 'Set-Cookie': 'mubok_admin=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0' });
    }
    if (pathname.startsWith('/api/admin/')) {
      const token = getSession(req);
      if (!token) return sendJson(res, 401, { error: 'Sign in to continue.' });
      const store = await readStore();
      if (pathname === '/api/admin/session' && req.method === 'GET') return sendJson(res, 200, { ok: true, products: store.products });
      if (pathname === '/api/admin/password' && req.method === 'POST') {
        const { currentPassword, newPassword } = await readJson(req);
        if (!(await verifyPassword(String(currentPassword || ''), store.admin))) return sendJson(res, 401, { error: 'Current password is incorrect.' });
        if (typeof newPassword !== 'string' || newPassword.length < 12 || newPassword.length > 200) return sendJson(res, 400, { error: 'New password must be at least 12 characters.' });
        const salt = randomBytes(16);
        store.admin = { salt: salt.toString('hex'), hash: (await scrypt(newPassword, salt, 64)).toString('hex') };
        await saveStore(store);
        sessions.clear();
        return sendJson(res, 200, { ok: true }, { 'Set-Cookie': 'mubok_admin=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0' });
      }
      if (pathname === '/api/admin/products' && req.method === 'GET') return sendJson(res, 200, store.products);
      if (pathname === '/api/admin/products' && req.method === 'POST') {
        const input = await readJson(req);
        const product = { id: randomUUID(), ...cleanProduct(input), createdAt: new Date().toISOString() };
        store.products.push(product);
        await saveStore(store);
        return sendJson(res, 201, product);
      }
      const match = pathname.match(/^\/api\/admin\/products\/([a-f0-9-]+)$/i);
      if (match && req.method === 'PUT') {
        const index = store.products.findIndex((product) => product.id === match[1]);
        if (index < 0) return sendJson(res, 404, { error: 'Product was not found.' });
        store.products[index] = cleanProduct(await readJson(req), store.products[index]);
        await saveStore(store);
        return sendJson(res, 200, store.products[index]);
      }
      if (match && req.method === 'DELETE') {
        const index = store.products.findIndex((product) => product.id === match[1]);
        if (index < 0) return sendJson(res, 404, { error: 'Product was not found.' });
        store.products.splice(index, 1);
        await saveStore(store);
        return sendJson(res, 200, { ok: true });
      }
      return sendJson(res, 404, { error: 'Admin endpoint was not found.' });
    }
    if (req.method === 'GET') return serveStatic(req, res, pathname);
    return sendJson(res, 404, { error: 'Not found.' });
  } catch (error) {
    console.error(error);
    return sendJson(res, error.status || 500, { error: error.status ? error.message : 'The request could not be completed.' });
  }
});

const port = Number(process.env.API_PORT || 3100);
server.listen(port, '127.0.0.1', () => console.log(`Mubok Farm API listening on http://127.0.0.1:${port}`));
