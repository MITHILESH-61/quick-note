# 📝 QuickNote API

A full-stack notes application with secure JWT authentication. Users can register, log in, and manage their personal notes.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)

---

## 🧱 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (Bearer tokens) + bcryptjs

---

## 📁 Project Structure

```
quicknote-api/
├── backend/
│   ├── src/
│   │   ├── controllers/   # auth + notes business logic
│   │   ├── middleware/    # auth, validation, error handler
│   │   ├── models/        # User, Note (Mongoose schemas)
│   │   └── routes/        # /api/auth, /api/notes
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/           # axios client w/ JWT interceptor
    │   ├── components/    # NoteModal
    │   ├── pages/         # Login, Register, Dashboard
    │   ├── App.jsx
    │   └── main.jsx
    └── .env.example
```

---

## 🚀 Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Backend

```bash
cd backend
cp .env.example .env       # then edit values
npm install
npm run dev                # starts on http://localhost:5000
```

`.env` variables:

| Variable        | Description                              |
|-----------------|------------------------------------------|
| `PORT`          | Server port (default 5000)               |
| `MONGO_URI`     | MongoDB connection string                |
| `JWT_SECRET`    | Long random string for signing JWTs      |
| `JWT_EXPIRES_IN`| Token lifetime (e.g. `7d`)               |
| `CLIENT_ORIGIN` | Frontend origin for CORS                 |

### 2. Frontend

```bash
cd frontend
cp .env.example .env       # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                # starts on http://localhost:5173
```

---

## 🔐 Authentication

All `/api/notes/*` routes require an `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are returned by `/api/auth/register` and `/api/auth/login`.

---

## 📡 API Endpoints

| Method | Route                | Description           | Auth |
|--------|----------------------|-----------------------|------|
| POST   | `/api/auth/register` | Create new user       | ❌   |
| POST   | `/api/auth/login`    | Log in, get JWT       | ❌   |
| GET    | `/api/notes`         | List current user's notes | ✅ |
| POST   | `/api/notes`         | Create a note         | ✅   |
| PUT    | `/api/notes/:id`     | Update a note         | ✅   |
| DELETE | `/api/notes/:id`     | Delete a note         | ✅   |

---

## 📨 Examples

### POST `/api/auth/register`

**Request**
```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "secret123"
}
```

**Response `201`**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "66f0...", "name": "Ada Lovelace", "email": "ada@example.com" }
}
```

### POST `/api/auth/login`

**Request**
```json
{ "email": "ada@example.com", "password": "secret123" }
```

**Response `200`**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "66f0...", "name": "Ada Lovelace", "email": "ada@example.com" }
}
```

### GET `/api/notes`

**Headers:** `Authorization: Bearer <token>`

**Response `200`**
```json
[
  {
    "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
    "title": "Shopping list",
    "content": "Milk, eggs, bread",
    "userId": "66f0...",
    "createdAt": "2025-04-17T10:00:00.000Z",
    "updatedAt": "2025-04-17T10:00:00.000Z"
  }
]
```

### POST `/api/notes`

**Request**
```json
{ "title": "Meeting notes", "content": "Discuss roadmap Q3" }
```

**Response `201`**
```json
{
  "_id": "66f1a2b3c4d5e6f7a8b9c0d2",
  "title": "Meeting notes",
  "content": "Discuss roadmap Q3",
  "userId": "66f0...",
  "createdAt": "2025-04-17T10:05:00.000Z",
  "updatedAt": "2025-04-17T10:05:00.000Z"
}
```

### PUT `/api/notes/:id`

**Request**
```json
{ "title": "Meeting notes (updated)", "content": "Discuss roadmap Q3 + Q4" }
```

**Response `200`**
```json
{
  "_id": "66f1a2b3c4d5e6f7a8b9c0d2",
  "title": "Meeting notes (updated)",
  "content": "Discuss roadmap Q3 + Q4",
  "userId": "66f0...",
  "createdAt": "2025-04-17T10:05:00.000Z",
  "updatedAt": "2025-04-17T10:10:00.000Z"
}
```

### DELETE `/api/notes/:id`

**Response `200`**
```json
{ "message": "Deleted" }
```

---

## 🛡️ Security Notes

- Passwords are hashed with bcrypt (10 rounds).
- JWTs are signed with `JWT_SECRET` and verified on every protected request.
- All note queries are scoped by `userId`, so users can only access their own notes.
- Input validation via `express-validator` (email format, required fields, length limits).
- CORS restricted to `CLIENT_ORIGIN`.

## 📜 License

MIT
