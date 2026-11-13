(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const dialog = $('#adminDialog');
  const auth = $('#adminAuth');
  const dashboard = $('#adminDashboard');
  const authMessage = $('#adminAuthMessage');
  const productMessage = $('#productMessage');
  const passwordMessage = $('#passwordMessage');
  const FALLBACK_IMAGES = {
    Crops: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
    Livestock: 'https://images.unsplash.com/photo-1662661879768-7d758fea315d?auto=format&fit=crop&w=900&q=80',
    'Animal products': 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=80',
    Other: '/mubok-farms-logo.jpg',
  };
  const money = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 2 });

  async function api(path, options = {}) {
    const response = await fetch(path, {
      credentials: 'same-origin',
      ...options,
      headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) },
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Something went wrong. Please try again.');
    return result;
  }

  function setMessage(target, text, isError = false) {
    target.textContent = text;
    target.classList.toggle('is-error', isError);
  }

  function makeProductCard(product) {
    const card = document.createElement('article');
    card.className = 'shop-card';
    const image = document.createElement('img');
    image.src = product.imageUrl || FALLBACK_IMAGES[product.category] || FALLBACK_IMAGES.Other;
    image.alt = product.name;
    image.loading = 'lazy';
    image.addEventListener('error', () => { image.src = FALLBACK_IMAGES[product.category] || FALLBACK_IMAGES.Other; }, { once: true });
    const info = document.createElement('div');
    info.className = 'shop-card-info';
    const category = document.createElement('span');
    category.className = 'shop-category';
    category.textContent = product.category;
    const title = document.createElement('h3');
    title.textContent = product.name;
    const description = document.createElement('p');
    description.textContent = product.description || 'Ask us for details and current availability.';
    const footer = document.createElement('div');
    footer.className = 'shop-card-footer';
    const price = document.createElement('strong');
    price.textContent = product.price == null ? 'Ask for price' : `${money.format(product.price)}${product.unit ? ` / ${product.unit}` : ''}`;
    const enquire = document.createElement('a');
    enquire.className = 'shop-enquire';
    enquire.href = `mailto:mubokfarms1215@gmail.com?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}`;
    enquire.textContent = 'Enquire ↗';
    footer.append(price, enquire);
    info.append(category, title, description, footer);
    card.append(image, info);
    return card;
  }

  async function loadPublicProducts() {
    const grid = $('#publicProducts');
    if (!grid) return;
    try {
      const products = await api('/api/products');
      grid.replaceChildren();
      if (!products.length) {
        const empty = document.createElement('div');
        empty.className = 'shop-empty';
        const title = document.createElement('h3');
        title.textContent = 'Today’s listings are being prepared.';
        const copy = document.createElement('p');
        copy.textContent = 'Contact the farm to ask about current crops, livestock, and seasonal availability.';
        const link = document.createElement('a');
        link.href = '#contact';
        link.className = 'btn btn-primary';
        link.textContent = 'Contact Mubok Farm';
        empty.append(title, copy, link);
        grid.append(empty);
        return;
      }
      products.forEach((product) => grid.append(makeProductCard(product)));
    } catch {
      grid.replaceChildren();
      const msg = document.createElement('p');
      msg.className = 'product-loading';
      msg.textContent = 'Farm listings are temporarily unavailable. Please contact us for current availability.';
      grid.append(msg);
    }
  }

  function renderAdminProducts(products) {
    const list = $('#adminProducts');
    list.replaceChildren();
    if (!products.length) {
      const empty = document.createElement('p');
      empty.className = 'admin-empty';
      empty.textContent = 'No products listed yet. Add your first farm listing with the form.';
      list.append(empty);
      return;
    }
    products.forEach((product) => {
      const row = document.createElement('article');
      row.className = 'inventory-row';
      const details = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = product.name;
      const meta = document.createElement('span');
      meta.textContent = `${product.category}${product.price == null ? ' · Ask for price' : ` · ${money.format(product.price)}`}${product.available ? '' : ' · Hidden'}`;
      details.append(title, meta);
      const actions = document.createElement('div');
      actions.className = 'inventory-actions';
      const edit = document.createElement('button');
      edit.type = 'button'; edit.className = 'admin-small-button'; edit.textContent = 'Edit';
      edit.addEventListener('click', () => fillProductForm(product));
      const remove = document.createElement('button');
      remove.type = 'button'; remove.className = 'admin-small-button danger'; remove.textContent = 'Delete';
      remove.addEventListener('click', async () => {
        if (!window.confirm(`Delete “${product.name}” from the farm shop?`)) return;
        try {
          await api(`/api/admin/products/${product.id}`, { method: 'DELETE' });
          await refreshProducts();
          await loadPublicProducts();
          setMessage(productMessage, 'Product deleted.');
        } catch (error) { setMessage(productMessage, error.message, true); }
      });
      actions.append(edit, remove);
      row.append(details, actions);
      list.append(row);
    });
  }

  async function refreshProducts() {
    renderAdminProducts(await api('/api/admin/products'));
  }

  function showDashboard() {
    auth.hidden = true;
    dashboard.hidden = false;
    refreshProducts().catch((error) => setMessage(productMessage, error.message, true));
  }

  function resetProductForm() {
    $('#productForm').reset();
    $('#productAvailable').checked = true;
    $('#productId').value = '';
    $('#productFormTitle').textContent = 'Add a product';
    $('#saveProduct').textContent = 'Add product';
    $('#cancelProductEdit').hidden = true;
  }

  function fillProductForm(product) {
    $('#productId').value = product.id;
    $('#productName').value = product.name;
    $('#productCategory').value = product.category;
    $('#productPrice').value = product.price ?? '';
    $('#productUnit').value = product.unit || '';
    $('#productImage').value = product.imageUrl || '';
    $('#productDescription').value = product.description || '';
    $('#productAvailable').checked = product.available;
    $('#productFormTitle').textContent = 'Edit product';
    $('#saveProduct').textContent = 'Save changes';
    $('#cancelProductEdit').hidden = false;
    $('#productForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function checkAdmin() {
    try {
      const status = await api('/api/admin/status');
      if (status.authenticated) return showDashboard();
      auth.hidden = false;
      dashboard.hidden = true;
      $('#adminLoginForm').hidden = !status.configured;
      $('#adminSetupForm').hidden = status.configured;
      $('#adminAuthIntro').textContent = status.configured
        ? 'Sign in to update product listings and your password.'
        : 'Create a secure password to set up this farm’s first admin account.';
      $('#adminTitle').textContent = status.configured ? 'Admin access' : 'Set up admin access';
    } catch (error) { setMessage(authMessage, error.message, true); }
  }

  document.querySelectorAll('[data-admin-open]').forEach((button) => button.addEventListener('click', async () => {
    if (!dialog.open) dialog.showModal();
    setMessage(authMessage, '');
    await checkAdmin();
  }));
  document.querySelectorAll('[data-admin-close]').forEach((button) => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

  $('#adminSetupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const password = $('#setupPassword').value;
    try {
      await api('/api/admin/setup', { method: 'POST', body: JSON.stringify({ password, setupKey: $('#setupKey').value }) });
      $('#adminSetupForm').reset();
      showDashboard();
      setMessage(authMessage, 'Admin account created. You are signed in.');
    } catch (error) { setMessage(authMessage, error.message, true); }
  });

  $('#adminLoginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ password: $('#adminPassword').value }) });
      $('#adminLoginForm').reset();
      showDashboard();
    } catch (error) { setMessage(authMessage, error.message, true); }
  });

  $('#adminLogout').addEventListener('click', async () => {
    await api('/api/admin/logout', { method: 'POST' }).catch(() => {});
    await checkAdmin();
  });

  $('#productForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = $('#productId').value;
    const product = {
      name: $('#productName').value.trim(), category: $('#productCategory').value,
      price: $('#productPrice').value || null, unit: $('#productUnit').value.trim(),
      imageUrl: $('#productImage').value.trim(), description: $('#productDescription').value.trim(),
      available: $('#productAvailable').checked,
    };
    try {
      await api(id ? `/api/admin/products/${id}` : '/api/admin/products', {
        method: id ? 'PUT' : 'POST', body: JSON.stringify(product),
      });
      resetProductForm();
      setMessage(productMessage, id ? 'Product updated.' : 'Product added to the farm shop.');
      await refreshProducts();
      await loadPublicProducts();
    } catch (error) { setMessage(productMessage, error.message, true); }
  });
  $('#cancelProductEdit').addEventListener('click', resetProductForm);

  $('#passwordForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await api('/api/admin/password', { method: 'POST', body: JSON.stringify({ currentPassword: $('#currentPassword').value, newPassword: $('#newPassword').value }) });
      $('#passwordForm').reset();
      await checkAdmin();
      setMessage(authMessage, 'Password updated. Please sign in again with your new password.');
    } catch (error) { setMessage(passwordMessage, error.message, true); }
  });

  loadPublicProducts();
})();
