# 🚀 Deployment Guide for CodeStorm 2026

This guide will help you deploy your **React + Node.js + MySQL** application for free.

## Prerequisites
- A **GitHub** account.
- Accounts on **Vercel** (Frontend), **Render** (Backend), and **TiDB Cloud** or **Aiven** (MySQL Database).

---

## Phase 1: Push Code to GitHub
1. Initialize git in your project root (`NRCM`) if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository on GitHub.
3. Push your code to the new repository.

---

## Phase 2: Deploy Database (MySQL)
Since you are using MySQL, you need a cloud provider. **TiDB Cloud** is a great free option.

1. Go to **[TiDB Cloud](https://tidbcloud.com/)** and sign up.
2. Create a **Serverless Tier** cluster (it's free).
3. Once created, click **"Connect"**.
4. Select **"Connect with General Driver"**.
5. Copy the **Connection String**. It will look something like this:
   `mysql://<user>:<password>@<host>:4002/<dbname>?ssl={"rejectUnauthorized":true}`
   *(Save this, you will need it for the Backend)*

---

## Phase 3: Deploy Backend (Render)
1. Go to **[Render.com](https://render.com/)** and sign up.
2. Click **"New +"** and select **"Web Service"**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Scroll down to **Environment Variables** and add:
   - `DATABASE_URL` = Paste your TiDB connection string from Phase 2.
   - `JWT_SECRET` = `EnterARandomSecretStringHere`
   - `PORT` = `5000` (Optional, Render usually detects it, but good to set).
6. Click **"Create Web Service"**.
7. Wait for it to deploy. Once live, copy the **onrender.com URL** (e.g., `https://nrcm-api.onrender.com`).

---

## Phase 4: Deploy Frontend (Vercel)
1. Go to **[Vercel.com](https://vercel.com/)** and sign up.
2. Click **"Add New..."** > **"Project"**.
3. Import your GitHub repository.
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: Click "Edit" and select `client`.
5. Open **Environment Variables**:
   - `VITE_API_URL` = Paste your Backend URL from Phase 3 (no trailing slash).
   - Example: `https://nrcm-api.onrender.com`
6. Click **"Deploy"**.

---

## Phase 5: Final Check
1. Open your Vercel Link.
2. Go to the "Register" page.
3. Try submitting a form.
   - If it works, congratulations! Your app is live! 🎉
   - If it fails, check the **Console** (F12) and Network tab for errors.

---

## Troubleshooting
- **CORS Error**: If you see CORS errors in the browser console, ensure your Backend `server.js` allows the Vercel domain. (Currently set to `app.use(cors())` which allows all, so it should work).
- **Database Connection Error**: Check your `DATABASE_URL` in Render. Ensure the password is correct and doesn't contain special characters causing parsing issues.
