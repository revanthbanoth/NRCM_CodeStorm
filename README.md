# CodeStorm 2026 - Hackathon Event Website

A premium, full-stack application for managing hackathon events, built with a focus on modern UI/UX, glassmorphism, and smooth animations.

**Stack:** React + Node.js + Express + MySQL (Sequelize)

## 🚀 Prerequisites

Before running the project, make sure you have the following installed:
- **Node.js** (v14 or higher)
- **MySQL Server** (Ensure it is installed and running)

## 🛠️ Project Structure

- **server/**: Node.js + Express + MySQL Backend
- **client/**: React + Vite + Tailwind CSS Frontend

## 🏁 How to Run Locally

### 1. Database Setup

1. Open your MySQL Client (Workbench, Command Line, etc.).
2. Create a new database for the project:
   ```sql
   CREATE DATABASE nrcm_hackathon;
   ```

### 2. Configure Backend

Navigate to the `server` folder and create a `.env` file (if not exists) based on the example:

**File: `server/.env`**
```env
PORT=5000
JWT_SECRET=your_super_secret_key_change_this
DB_HOST=localhost
DB_USER=root            # Your MySQL Username
DB_PASSWORD=your_password # Your MySQL Password
DB_NAME=nrcm_hackathon  # The database name you created
```

### 3. Start the Backend (Server)

OPEN A TERMINAL and navigate to the `server` folder:

```bash
cd server
```

Install dependencies:
```bash
npm install
```

Start the server:
```bash
npm start
```
*The server will run on `http://localhost:5000`. It will automatically connect to MySQL and create the necessary tables.*

### 4. Start the Frontend (Client)

OPEN A NEW TERMINAL and navigate to the `client` folder:

```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
*The client will run on `http://localhost:5173`*

## 🌐 Application URL

Once both terminals are running, open your browser and go to:
**http://localhost:5173**

## ✨ Features

- **Home Page**: Premium animations, hero section.
- **Registration**: Full form with validation.
- **Idea Submission**: Detailed submission form.
- **Backend**: Complete REST API using Sequelize & MySQL.
