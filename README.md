# Backend – Authentication & Task Management API

## Project Overview

This project is a **scalable REST API** built as part of the **Backend Developer (Intern) Assignment**.\
It focuses on secure authentication, role-based access, and CRUD operations, with a simple frontend used only to demonstrate API functionality.

The backend is designed with **security, modularity, and scalability** in mind.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ODM)
- **JWT Authentication**
- **bcryptjs** (password hashing)
- **HTTP-only Cookies**
- **Postman / Swagger** (API documentation)

---

## Core Features

### Authentication & Authorization

- User **registration & login**
- Password hashing using **bcrypt**
- **JWT-based authentication**
- Access & Refresh token strategy
- Tokens stored securely in **HTTP-only cookies**
- Logout with refresh token invalidation
- Role support (`user`, `admin`) for future access control

---

### Task Management (CRUD)

- Create tasks
- Read user-specific tasks
- Update task completion status
- Delete tasks
- Ownership enforced at database query level

---
### API Design

- RESTful API structure
- API versioning (`/api/v1`)
- Proper HTTP status codes
- Clean separation of:
  - routes
  - controllers
  - models
  - middlewares

---

## Project Structure

```
src/
│── config/
│── controllers/
│── middlewares/
│── models/
│── routes/
│── app.js
│── server.js
```

---

## Database Schema

### User Schema

- `username` (String)
- `email` (String, unique)
- `password` (hashed)
- `role` (`user` | `admin`)
- `refreshToken`
- timestamps

### Task Schema

- `title`
- `completed` (Boolean)
- `user` (ObjectId reference)
- timestamps

---

## Authentication Flow

1. User logs in
2. Backend generates:
   - **Access Token** (short-lived)
   - **Refresh Token** (long-lived)
3. Tokens are:
   - stored in **HTTP-only cookies**
   - refresh token persisted in DB
4. Protected routes verify access token
5. Logout clears cookies and invalidates refresh token

> Refresh token rotation can be added as a future improvement.

---

## Getting Started (Backend Setup)

### 1. Clone the repository

```bash
git clone <backend-repo-url>
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
NODE_ENV=development
```

### 4. Run the server

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## API Endpoints (v1)

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`

### Tasks (Protected)

- `GET /api/v1/tasks`
- `POST /api/v1/tasks`
- `PUT /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

---

## API Documentation

- **Postman Collection**:\
   *(Add Postman link here)*

- **Swagger (optional)**:\
   *(If hosted, add Swagger URL)*

---

## Frontend Integration

A minimal frontend is built using **React** to:

- Register & login users
- Access protected dashboard
- Perform CRUD operations on tasks
- Demonstrate cookie-based authentication

**Frontend Repository / Hosted Link:**\
*(Add frontend GitHub or hosted URL here)*

---

## Security Practices

- Password hashing with bcrypt
- JWTs stored in HTTP-only cookies
- No token exposure to frontend JavaScript
- Database-level ownership checks
- Refresh token invalidation on logout
- Clean separation of concerns

---

## Scalability Notes (Future Improvements)

- Refresh token rotation
- Rate limiting on auth routes
- Redis caching for frequently accessed data
- Centralized error handling & logging
- Dockerized deployment
- Microservices-based separation if scale increases
- Load balancing behind reverse proxy

---

## Assignment Details

- **Assignment Duration:** 3 days
- **Submission Deadline:** 4th January (EOD)

---

## Evaluation Alignment

This project satisfies all evaluation criteria:

- RESTful API design
- Secure authentication
- Database schema design
- CRUD functionality
- Frontend integration
- Scalable & maintainable structure

---

## Author

**Sachin Kumar**\
Backend Developer (Intern Candidate)

