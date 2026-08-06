Goal: Add login/register and a user dashboard.

Tasks:

Implement mock authentication:

Use Zustand store for auth (authStore) with user, isLoggedIn, login, logout.

login calls /api/auth/login with email/password; check against users.json.

Store user data in localStorage or cookie (just for demo).

Create login and register pages (/login, /register) with forms.

Protected routes: wrap account pages with middleware or client‑side guard.

Build /account dashboard:

Sidebar: Profile, Orders, Addresses, Wishlist.

Order History – list of past orders with status (delivered, pending).

Profile – edit name, email (mock update).

Saved Addresses – list and add new addresses.

Update checkout to use saved addresses if logged in.

Deliverables:

Full authentication flow (mock).

User can see own orders and manage profile.