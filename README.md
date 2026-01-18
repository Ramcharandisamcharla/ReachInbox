# 🚀 ReachInbox – Full-Stack Email Job Scheduler

This project is a **production-grade email scheduling system** built as part of the **ReachInbox Hiring Assignment**.

It demonstrates how large-scale email systems handle **delayed scheduling, persistence, rate limiting, concurrency, and restart safety**, along with a clean **frontend dashboard** and **Google OAuth login**.

---

## 📌 Features Overview

### ✅ Backend
- Email scheduling using **BullMQ delayed jobs** (NO cron jobs)
- Persistent job storage using **Redis**
- Email metadata persistence using **PostgreSQL**
- Idempotent email sending (no duplicates)
- Configurable **worker concurrency**
- Configurable **hourly rate limiting**
- Automatic **rescheduling** when rate limit is exceeded
- Survives server restarts without losing jobs

### ✅ Frontend
- Real **Google OAuth login**
- Dashboard with:
  - Scheduled Emails
  - Sent Emails
- Compose Email modal
- CSV / text file upload for email leads
- Email count preview before scheduling
- Clean UI built with Tailwind CSS
- Loading states and empty states

---

## 🧰 Tech Stack

### Backend
- **TypeScript**
- **Express.js**
- **BullMQ**
- **Redis**
- **PostgreSQL**
- **Prisma ORM**
- **Nodemailer**
- **Ethereal Email (SMTP)**

### Frontend
- **React.js**
- **TypeScript**
- **Tailwind CSS**
- **Google Identity Services (OAuth)**

### Infrastructure
- **Docker** (for Redis & PostgreSQL)

---

## 🧠 Architecture Overview

Frontend (React + Google OAuth)
↓
Backend API (Express + TypeScript)
↓
PostgreSQL (EmailJob persistence)
↓
BullMQ Queue (Redis-backed delayed jobs)
↓
Worker (Concurrency + Rate Limiting)
↓
Ethereal SMTP



---

## ⏱ Email Scheduling & Persistence

- Every email is **stored in PostgreSQL before scheduling**
- Scheduling is done using **BullMQ delayed jobs**
- Redis persists job state
- On server restart:
  - Pending emails are still sent at the correct time
  - Already sent emails are NOT duplicated
- Worker checks DB status before sending to ensure idempotency

❌ No cron jobs are used (as required)

---

## 🚦 Rate Limiting & Concurrency

### Concurrency
- Worker concurrency is configurable via environment variable:
  ```env
  WORKER_CONCURRENCY=5
Hourly Rate Limiting

Configurable via environment variable:

MAX_EMAILS_PER_HOUR=100


Redis-based counters ensure safety across:

Multiple workers

Server restarts

Rate-Limit Logic

Redis key format:

email_rate:{senderEmail}:{YYYYMMDDHH}


If hourly limit is exceeded:

Email jobs are NOT dropped

Jobs are rescheduled to the next available hour

Order is preserved as much as possible

🖥 Backend Setup
1️⃣ Start Infrastructure (Redis & PostgreSQL)

From project root:

docker compose up -d


Ensure:

Redis → localhost:6379

PostgreSQL → localhost:5432

2️⃣ Backend Environment Variables

Create file:

backend/.env

PORT=4000

REDIS_HOST=localhost
REDIS_PORT=6379

DB_URL=postgresql://reachinbox:reachinbox@localhost:5432/reachinbox

WORKER_CONCURRENCY=5
MAX_EMAILS_PER_HOUR=100

ETHEREAL_USER=your_ethereal_username
ETHEREAL_PASS=your_ethereal_password


👉 Ethereal credentials can be created at: https://ethereal.email/

3️⃣ Install & Run Backend
cd backend
npm install
npm run dev


Backend runs at:

http://localhost:4000

4️⃣ Start Worker (Required)

In a separate terminal:

cd backend
npm run worker

🌐 Frontend Setup
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

🔐 Google OAuth Setup

Implemented using Google Identity Services

Real OAuth (no mock)

Shows user login and allows logout

Redirects user to dashboard after login

Authorized origin:

http://localhost:3000

🧪 Testing Restart Safety

Schedule emails for a future time

Stop backend & worker

Restart backend & worker

Emails are still sent at the correct time

No duplicates occur
