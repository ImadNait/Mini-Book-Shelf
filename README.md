# Mini Book Shelf

A full-stack web application that allows authenticated users to manage their personal book collections. Built with modern technologies including React, NestJS, TypeORM, and PostgreSQL.

---

## Features

### Authentication
- User registration and login with JWT authentication
- Secure route protection
- Token-based session management
- Password hashing with bcrypt

### Book Management
- Create, read, update, and delete personal books
- User-specific book collections
- Input validation and error handling

### Security
- JWT token authentication
- Protected API endpoints
- User data isolation
- Input sanitization and validation

---

## Technology Stack

### Frontend
- **React 18** – Modern React with hooks
- **TypeScript** – Type-safe JavaScript
- **Axios** – HTTP client for API requests
- **Tailwind CSS** – Utility-first CSS framework
- **React Router** – Client-side routing

### Backend
- **NestJS** – Progressive Node.js framework
- **TypeORM** – Object-relational mapping
- **PostgreSQL** – Relational database
- **JWT** – JSON Web Token authentication
- **bcrypt** – Password hashing
- **class-validator** – Input validation

---

## Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mini-book-shelf.git
cd mini-book-shelf
```
### 2. Backend Setup (NestJS)
cd backend
npm install
``
Create a .env file in the backend directory:
```ini
DATABASE_URL=postgres://your_db_user:your_db_pass@localhost:5432/your_db_name
JWT_SECRET=your_jwt_secret
```
Run migrations and start the backend:
```bash
npm run start:dev
```
### 3. Frontend Setup (React)
```bash
cd ../frontend
npm install
# or
yarn install
```
Create a .env file in the frontend directory:
```ini
VITE_API_URL=http://localhost:3000
```
Start the frontend:
```bash
npm run dev
```
## What I Learned
* **Improved NestJS Proficiency:** Gained deeper understanding of modules, services, and guards in NestJS.

* **Mastered JWT Authentication in NestJS:** Learned how to securely implement token-based auth, and integrate it with protected endpoints.

* **Explored TypeORM:** Learned how to define entities, relationships, and handle queries using the repository pattern.

* **Overcame Axios + JWT Challenges:** Dealt with tricky bugs related to missing or invalid tokens, ensuring proper Axios interceptor behavior and secure session handling.


