# Mini Event Management System

A RESTful API built with Node.js, Express, Prisma 7 ORM, and MySQL for managing events, bookings, and attendance.

---
## 🔗 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [candid-trifle-bbe0f9.netlify.app](https://candid-trifle-bbe0f9.netlify.app) |
| **Backend API** | [mini-event-management-system.onrender.com](https://mini-event-management-system.onrender.com) |
| **Swagger Docs** | [mini-event-management-system.onrender.com/api-docs](https://mini-event-management-system.onrender.com/api-docs) |

---

## Tech Stack

- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **ORM**: Prisma 7
- **Database Driver**: `@prisma/adapter-mariadb` + `mariadb`
- **Database**: MySQL 8+
- **Validation**: Joi
- **Documentation**: Swagger UI / OpenAPI 3.0

---

## Project Structure

```
mini-event-management/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js           # Prisma client instance
│   │   │   └── env.js          # Environment variable validation
│   │   ├── controllers/        # Request/response handlers
│   │   ├── routes/             # Route definitions
│   │   ├── services/           # Business logic + DB queries
│   │   ├── validators/         # Joi validation schemas
│   │   ├── middlewares/        # validate.js + errorHandler.js
│   │   └── app.js              # Express app entry point
│   ├── docs/
│   │   └── swagger.yaml        # OpenAPI 3.0 specification
│   ├── .env                    # Local environment variables (never commit)
│   ├── .env.example            # Template for environment variables
│   ├── prisma.config.js        # Prisma 7 configuration
│   ├── schema.sql              # Raw SQL schema export
│   └── package.json
├── postman/
│   └── collection.json         # Postman collection for API testing
└── README.md
```

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [MySQL](https://www.mysql.com/) v8 or higher
- npm v9 or higher

---

## Local Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mini-event-management.git
cd mini-event-management/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your local MySQL credentials:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=event_management
PORT=3000
```

### 4. Create the database

Connect to your MySQL instance and run:

```sql
CREATE DATABASE event_management;
```

### 5. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 6. Generate Prisma client

```bash
npx prisma generate
```

### 7. Start the server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs at: `http://localhost:3000`
Swagger docs at: `http://localhost:3000/api-docs`

---

## What Changes After Deployment

| Thing | Local | Production |
|-------|-------|------------|
| API base URL | `http://localhost:3000` | `https://your-app.onrender.com` |
| Swagger docs | `http://localhost:3000/api-docs` | `https://your-app.onrender.com/api-docs` |
| DB host | `localhost` | hosted MySQL from Railway/Render |
| Migration command | `prisma migrate dev` | `prisma migrate deploy` |
| CORS origin | `*` | your Netlify frontend URL |
| `.env` values | local credentials | Render environment variables dashboard |


### Update Postman for production testing

Click the **eye icon** in Postman → change `baseUrl` from:
```
http://localhost:3000
```
to:
```
https://your-app.onrender.com
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/users` | Create a new user |
| GET | `/events` | List all upcoming events |
| POST | `/events` | Create a new event |
| POST | `/bookings` | Book a ticket for an event |
| GET | `/users/:id/bookings` | Get all bookings for a user |
| POST | `/events/:id/attendance` | Check in using a booking code |

---

## API Documentation

Swagger UI is served directly by the Express server — no separate hosting needed:

- **Local**: `http://localhost:3000/api-docs`
- **Production**: `https://your-app.onrender.com/api-docs`

---

## Postman Collection

Import `postman/collection.json` into Postman to test all endpoints.

Collection variables (`userId`, `eventId`, `bookingCode`) are **auto-saved** after each request so you can run them in sequence without any manual copy-pasting.

**Recommended order:**
1. Health Check
2. Create User
3. Create Event
4. Get All Events
5. Create Booking
6. Get User Bookings
7. Check In

---

## Database Schema

The full database schema is available in `schema.sql`. To import manually:

```bash
mysql -u root -p event_management < schema.sql
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start server with nodemon (auto-reload) |
| `npm start` | Start server in production mode |
| `npm run prisma:migrate` | Run Prisma migrations (development) |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:studio` | Open Prisma Studio at localhost:5555 |

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MYSQL_HOST` | MySQL host | `localhost` |
| `MYSQL_PORT` | MySQL port | `3306` |
| `MYSQL_USER` | MySQL username | `root` |
| `MYSQL_PASSWORD` | MySQL password | `yourpassword` |
| `MYSQL_DATABASE` | Database name | `event_management` |
| `PORT` | Server port | `3000` |
| `FRONTEND_URL` | Frontend URL for CORS (production only) |

---

## Error Handling

All errors follow this response format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 404 | Not Found |
| 409 | Conflict (duplicate booking, already checked in) |
| 500 | Internal Server Error |

---

## Race Condition Handling

The `POST /bookings` endpoint uses a **MySQL transaction with row-level locking** (`SELECT ... FOR UPDATE`) to prevent race conditions when multiple users try to book the last available ticket simultaneously. This ensures `remainingTickets` is always accurate even under high concurrent load.

---

## Notes

- All IDs are UUIDs for security and scalability
- A user cannot book the same event twice
- A user cannot check in to the same event twice
- Booking codes are unique UUIDs generated at booking time
- Swagger UI is served directly by Express — no separate hosting needed