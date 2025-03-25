# Taskly (Task Management API)

## Live URL
[Taskly (Task Management App)](https://taskly-pgf7.onrender.com/) - (https://taskly-pgf7.onrender.com/)

**⚠ Warning:** This application is deployed on Render. Please wait for some time if the server is inactive.

## Overview
Taskly allows users to manage their tasks, including creating, updating, retrieving, and deleting tasks. User authentication is required for most operations, using JWT tokens.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Installation Steps and Setup Instructions
### Prerequisites:
- Node.js installed
- MongoDB database running (either locally or using MongoDB Atlas)

### Steps to Set Up the Project:
1. Clone the repository:
   ```bash
   git clone https://github.com/simhadri-bharath/Taskly
   cd taskly
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Base URL
```
http://localhost:8000/api
```

## Authentication
All protected routes require a valid JWT token in the `Authorization` header.
```
Authorization: Bearer <your_token>
```

---

## Endpoints

### **User Authentication**

#### **Register a New User**
- **URL:** `/user/register`
- **Method:** `POST`
- **Authentication:** Public
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "tc": true
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Registration successful",
  "token": "your_jwt_token"
}
```

#### **User Login**
- **URL:** `/user/login`
- **Method:** `POST`
- **Authentication:** Public
- **Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

#### **Get Logged-in User**
- **URL:** `/user/loggeduser`
- **Method:** `GET`
- **Authentication:** **Protected** (JWT required)
- **Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```
- **Response:**
```json
{
  "user": {
    "_id": "67c6893849daf578dca351d0",
    "name": "user1",
    "email": "user1@example.com",
    "tc": true
  }
}
```

---

### **Taskly Management**

#### **Create a New Task**
- **URL:** `/task`
- **Method:** `POST`
- **Authentication:** **Protected** (JWT required)
- **Request Body:**
```json
{
  "title": "do the work",
  "description": "Finish the work",
  "completed": false
}
```
- **Response:**
```json
{
  "title": "do the work",
  "description": "Finish the work",
  "completed": false,
  "user": "67c6893849daf578dca351d0",
  "_id": "67e2b495cd84d06b811e220a"
}
```

#### **Get All Tasks**
- **URL:** `/task`
- **Method:** `GET`
- **Authentication:** **Protected** (JWT required)
- **Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```
- **Response:**
```json
[
  {
    "_id": "67e2841ced7cd525c1738afb",
    "title": "do work smartly",
    "description": "consistency is the key to success",
    "completed": false,
    "user": {
      "_id": "67c6893849daf578dca351d0",
      "name": "user1",
      "email": "user1@example.com"
    }
  }
]
```

#### **Update a Task**
- **URL:** `/task/:id`
- **Method:** `PUT`
- **Authentication:** **Protected** (JWT required)
- **Request Body:**
```json
{
  "_id": "67e2841ced7cd525c1738afb",
  "title": "do work smartly",
  "description": "consistency is the key to success",
  "completed": false,
  "user": {
    "_id": "67c6893849daf578dca351d0",
    "name": "user1",
    "email": "user1@example.com"
  },
  "__v": 0
}
```
- **Response:**
```json
{
  "message": "Task updated successfully"
}
```

#### **Delete a Task**
- **URL:** `/task/:id`
- **Method:** `DELETE`
- **Authentication:** **Protected** (JWT required)
- **Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Live URL
[Taskly (Task Management App)](https://taskly-pgf7.onrender.com/) - (https://taskly-pgf7.onrender.com/)

**⚠ Warning:** This application is deployed on Render. Please wait for some time if the server is inactive.

## Author
**Simhadri Bharath**  
**Email:** simhadribharath2004@gmail.com  
**Phone:** 9550934974  

---

