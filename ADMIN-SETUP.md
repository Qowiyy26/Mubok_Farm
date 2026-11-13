# Mubok Farm shop and admin setup

The public farm shop reads its listings from the local Node API. Admin passwords are stored as salted scrypt hashes, admin sessions use HttpOnly cookies, and saved product and admin data lives in the ignored `data/` folder.

## Start the site locally

1. Install Node.js 20 or newer.
2. In PowerShell, open this project folder and run `npm install`.
3. Set a private one-time setup key of at least 24 characters, then start the app:

   ```powershell
   $env:ADMIN_SETUP_KEY = "put-a-long-random-private-value-here"
   npm run dev
   ```

4. Open the Vite address printed in the terminal, click **Admin**, enter the same one-time setup key, and choose an admin password with at least 12 characters.
5. After creating the admin account, the setup key is no longer accepted. Keep the key private while first-time setup is pending.

The admin area lets you add, edit, hide, and delete products, set prices and units, add HTTPS image links, and change the password. The public shop displays listings marked available. Product information and password hashes are saved under `data/farm-data.json`; do not delete that file if you want to retain the shop and account.

For deployment, build with `npm run build`, then run `npm start` behind an HTTPS reverse proxy. Set `ADMIN_SETUP_KEY` in the hosting environment before opening the admin setup screen. Set `NODE_ENV=production` so session cookies are marked Secure. Keep the `data/` directory on persistent storage and back it up securely.
