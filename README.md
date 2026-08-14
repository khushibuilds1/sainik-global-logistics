# Sainik Global Logistics — Full-Stack Website

Premium logistics website for **Sainik Global Logistics Pvt. Ltd.**, Ahmedabad.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis |
| Backend | Node.js · Express.js · MongoDB Atlas · JWT · Nodemailer |
| UI Libraries | Lucide React · React CountUp · React Intersection Observer · Sonner |

---

## Project Structure

```
sainik-global/
├── frontend/               # Next.js 15 App
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   │   ├── page.tsx          # Home
│   │   │   ├── about/            # About Us
│   │   │   ├── services/         # Services
│   │   │   ├── industries/       # Industries
│   │   │   ├── network/          # Global Network
│   │   │   ├── quote/            # Request Quote
│   │   │   ├── contact/          # Contact Us
│   │   │   └── admin/            # Admin Dashboard
│   │   ├── components/
│   │   │   ├── layout/           # Navbar, Footer
│   │   │   ├── sections/         # All page sections
│   │   │   └── ui/               # Cursor, Loading screen
│   │   ├── styles/globals.css
│   │   └── lib/utils.ts
│   ├── tailwind.config.ts
│   └── .env.local.example
│
└── backend/                # Express.js API
    ├── src/
    │   ├── config/         # DB + Nodemailer
    │   ├── controllers/    # Auth, Quotes, Contact, Dashboard
    │   ├── middleware/     # JWT auth, error handler
    │   ├── models/         # User, QuoteRequest, ContactInquiry
    │   ├── routes/         # auth, quotes, contact, dashboard
    │   ├── utils/          # seedAdmin.js
    │   └── index.js        # Express entry point
    └── .env.example
```

---

## Quick Start

### 1. Clone & Install

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Environment Variables

**Backend** — copy `.env.example` to `.env` and fill in:
```bash
cp backend/.env.example backend/.env
```

Key variables:
- `MONGODB_URI` — your MongoDB Atlas connection string
- `JWT_SECRET` — random 32+ char string
- `EMAIL_USER` / `EMAIL_PASS` — Gmail address + App Password
- `NOTIFY_EMAIL` — where quote/contact notifications go (e.g. sales@sainikglobal.com)

**Frontend** — copy `.env.local.example` to `.env.local`:
```bash
cp frontend/.env.local.example frontend/.env.local
```

### 3. Seed Admin User

```bash
cd backend
node src/utils/seedAdmin.js
```

Default credentials (change after first login):
- Email: `admin@sainikglobal.com`
- Password: `Sainik@2024!`

### 4. Run Development

```bash
# Terminal 1 — Backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## API Endpoints

### Public
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/quotes` | Submit quote request |
| `POST` | `/api/contact` | Submit contact inquiry |
| `GET` | `/health` | Health check |

### Admin (JWT required)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin login |
| `GET` | `/api/auth/me` | Get current user |
| `GET` | `/api/dashboard` | Analytics overview |
| `GET` | `/api/quotes` | List all quotes |
| `GET` | `/api/quotes/:id` | Get single quote |
| `PATCH` | `/api/quotes/:id` | Update status/notes |
| `DELETE` | `/api/quotes/:id` | Delete quote |
| `GET` | `/api/contact` | List all inquiries |
| `PATCH` | `/api/contact/:id` | Mark read/replied |
| `DELETE` | `/api/contact/:id` | Delete inquiry |

---

## Production Deployment

### Frontend → Vercel

```bash
cd frontend

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_API_URL = https://api.sainikglobal.com

npm run build    # test build locally first
# Then push to GitHub and import in Vercel
```

### Backend → Railway / Render / VPS

**Railway (recommended):**
1. Push backend to GitHub
2. Create new Railway project → "Deploy from GitHub"
3. Set all `.env` variables in Railway dashboard
4. Railway auto-detects Node.js and runs `npm start`

**PM2 on VPS:**
```bash
npm install -g pm2
cd backend
pm2 start src/index.js --name sainik-api
pm2 save
pm2 startup
```

### MongoDB Atlas
1. Create free M0 cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create database user
3. Whitelist IP (`0.0.0.0/0` for dynamic IPs)
4. Copy connection string to `MONGODB_URI`

### Gmail App Password (for email notifications)
1. Enable 2FA on the Gmail account
2. Go to Google Account → Security → App Passwords
3. Generate password for "Mail" / "Other"
4. Use 16-char password as `EMAIL_PASS`

---

## Brand Identity

| Token | Value |
|---|---|
| Primary Red | `#F0064F` |
| Dark Background | `#0B0F14` |
| Dark Surface | `#111720` |
| Card Background | `#0F1520` |
| Font Display | Barlow Condensed |
| Font Body | Barlow |

---

## Company Details (Sainik Global Logistics Pvt. Ltd.)

- **GSTIN:** 24ABTCS1582J1ZT
- **Phone:** +91 7600951298
- **Email:** sales@sainikglobal.com
- **Registered Office:** E-102, Devsatya CHS, New CG Road, Chandkheda, Ahmedabad 382424
- **Corporate Office:** 602, 6th Floor, Mangal Murti Complex, Ashram Road, Ahmedabad 380009
