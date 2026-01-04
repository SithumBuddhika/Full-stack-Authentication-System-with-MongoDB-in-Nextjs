# Full-Stack Authentication System with MongoDB in Next.js (App Router) 🔐

> **Notice:**  
> This project was developed as part of a **tutorial-based learning assignment** to practice and understand **Next.js**, **TypeScript**, and **full-stack authentication concepts**.  
> It is intended for **educational purposes** and learning, not for production use.

A complete **full-stack authentication system** built using **Next.js App Router + MongoDB**.  
This project covers the full auth lifecycle with modern UI + secure backend routes:

✅ Signup (bcrypt password hashing)  
✅ Login (JWT stored in **httpOnly cookie**)  
✅ Logout (clears cookie)  
✅ Get current user (`/api/users/me`)  
✅ Email verification (token + expiry)  
✅ Forgot password + reset password (token + expiry)  
✅ Email sending using **Nodemailer + Mailtrap**  
✅ Clean, modern UI using **Tailwind CSS** + toast notifications

---

## ✨ Key Features

### 🔹 Authentication (JWT Cookies)
- On login, a JWT is created and stored inside a secure **httpOnly cookie** (`token`)
- Protected routes use this cookie to identify the user
- Logout clears the cookie instantly

### 🔹 Email Verification
- On signup, a verification token and expiry are generated and stored in MongoDB
- A verification email is sent containing a link:
  - `/verifyemail?token=...`
- When verified:
  - `isVerified = true`
  - verification token fields are cleared

### 🔹 Forgot Password + Reset Password
- Forgot password form triggers `/api/users/forgotpassword`
- A reset token + expiry is generated and stored
- Reset email contains:
  - `/resetpassword?token=...`
- Reset endpoint validates token + expiry and updates password (bcrypt)
- Reset token fields are cleared after successful reset

### 🔹 Modern UI (Tailwind)
Pages are fully styled:
- `/signup`
- `/login` (includes “Forgot password?” link)
- `/forgotpassword`
- `/resetpassword`
- `/verifyemail`
- `/profile` (protected, includes logout + get user details)

---

## 🧱 Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **Nodemailer**
- **Axios**
- **Tailwind CSS**
- **react-hot-toast**

---

## 📁 Project Structure (Tree)

```bash
nextjs-auth-full-stack/
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  └─ users/
│  │  │     ├─ signup/
│  │  │     │  └─ route.ts
│  │  │     ├─ login/
│  │  │     │  └─ route.ts
│  │  │     ├─ logout/
│  │  │     │  └─ route.ts
│  │  │     ├─ me/
│  │  │     │  └─ route.ts
│  │  │     ├─ verifyemail/
│  │  │     │  └─ route.ts
│  │  │     ├─ forgotpassword/
│  │  │     │  └─ route.ts
│  │  │     └─ resetpassword/
│  │  │        └─ route.ts
│  │  ├─ login/
│  │  │  └─ page.tsx
│  │  ├─ signup/
│  │  │  └─ page.tsx
│  │  ├─ profile/
│  │  │  ├─ [id]/
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ forgotpassword/
│  │  │  └─ page.tsx
│  │  ├─ resetpassword/
│  │  │  └─ page.tsx
│  │  ├─ verifyemail/
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ dbConfig/
│  │  └─ dbConfig.ts
│  ├─ helpers/
│  │  ├─ getDataFromToken.ts
│  │  └─ mailer.ts
│  ├─ models/
│  │  └─ userModel.js
│  └─ proxy.ts
├─ .env
├─ .gitignore
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.js
└─ tsconfig.json
```
⚙️ Environment Setup
---
Create a .env file in the project root:
```
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret_key
DOMAIN=http://localhost:3000
```

📧 Email Provider
---
This project uses Mailtrap via Nodemailer (SMTP sandbox).
Update credentials in src/helpers/mailer.ts or move them to .env (recommended).

▶️ Installation & Run
---
Install dependencies:
```
npm install
```

Start development server:
```
npm run dev
```

🔗Open:
---
```
http://localhost:3000
```
---
🔌 API Endpoints
---
✅ Signup

POST /api/users/signup

Body:
```
{
  "username": "user1",
  "email": "user1@gmail.com",
  "password": "password123"
}
```

Creates the user, hashes password, sends verification email.

---

✅ Verify Email

POST /api/users/verifyemail

Body:
```
{ "token": "..." }
```

Validates token + expiry and verifies account.

---
✅ Login

POST /api/users/login

Body:
```
{
  "email": "user1@gmail.com",
  "password": "password123"
}
```

Creates JWT and sets token cookie.

---
✅ Get Current User

GET /api/users/me

Requires cookie. Returns user data without password.

---
✅ Logout

GET /api/users/logout

Clears the token cookie.

---
✅ Forgot Password

POST /api/users/forgotpassword

Body:
```
{ "email": "user1@gmail.com" }
```

Always returns success message. If user exists, sends reset email.

---

✅ Reset Password

POST /api/users/resetpassword

Body:
```
{
  "token": "...",
  "password": "newPassword123"
}
```

Validates reset token + expiry and updates password.

---
## 🧪 How to Test (End-to-End)

### 1) Signup + Verify
1. Go to `/signup`
2. Create a new account
3. Check Mailtrap inbox
4. Open verify link
5. Verified message appears
6. Login now works

### 2) Forgot Password + Reset
1. Go to `/forgotpassword`
2. Enter your email
3. Check Mailtrap inbox
4. Open reset link
5. Set a new password
6. Login with new password

 🔐 Notes (Security & Best Practices)
---
- Passwords are hashed with `bcryptjs`
- JWT token stored in **httpOnly cookie** (safer than localStorage)
- Forgot password does not reveal whether an email exists (prevents user enumeration)
- Verify and reset links expire in **1 hour**
- Reset + verify tokens are cleared after successful use

🔎 Contact
---
- Email: [officialsithumbuddhika@gmail.com](mailto:officialsithumbuddhika@gmail.com)  
- LinkedIn: [Sithum Buddhika Jayalal](https://www.linkedin.com/in/sithum-buddhika-jayalal-827860341)
