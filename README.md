# Task Management API

## Overview
This API allows users to manage their tasks, including creating, updating, retrieving, and deleting tasks. User authentication is required for most operations, using JWT tokens.

## Installation Steps and Setup Instructions
### Prerequisites:
- Node.js installed
- MongoDB database running (either locally or using MongoDB Atlas)

### Steps to Set Up the Project:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/task-management-api.git
   cd task-management-api
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

#### **Change Password**
- **URL:** `/user/changePassword`
- **Method:** `POST`
- **Authentication:** **Protected** (JWT required)
- **Request Body:**
```json
{
  "password": "newpassword",
  "password_confirmation": "newpassword"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Password changed successfully"
}
```

---

### **Task Management**

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
    "description": "consistency is key to success",
    "completed": false,
    "user": {
      "_id": "67c6893849daf578dca351d0",
      "name": "user1",
      "email": "user1@example.com"
    }
  }
]
```

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

#### **Update a Task**
- **URL:** `/task/:id`
- **Method:** `PUT`
- **Authentication:** **Protected** (JWT required)
- **Request Body:**
```json
{
  "completed": true
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

## Testing the API with Postman or cURL

### Using Postman:
1. Import the provided Postman collection (thunder-collection_postman_JwtAuthUser.json).
2. Update the `Authorization` header in requests with a valid JWT token.
3. Use the predefined endpoints to test the API.

### Using cURL:
- **Login User:**
  ```sh
  curl -X POST "http://localhost:8000/api/user/login" -H "Content-Type: application/json" -d '{ "email": "user1@example.com", "password": "user1" }'
  ```
- **Get Tasks:**
  ```sh
  curl -X GET "http://localhost:8000/api/task" -H "Authorization: Bearer your_jwt_token"
  ```

---

## UI Screenshots

### **Home Page**
![Home](https://github.com/simhadri-bharath/Taskly/blob/main/frontend/src/assets/home.png)


### **Login Page**
![Login](https://github.com/simhadri-bharath/Taskly/blob/main/frontend/src/assets/login.png)

### **Navbar**
![Navbar](https://github.com/simhadri-bharath/Taskly/blob/main/frontend/src/assets/navbar.png)

### **Register Page**
![Register](https://github.com/simhadri-bharath/Taskly/blob/main/frontend/src/assets/register.png)

### **Task Creation**
![Task Creation](https://github.com/simhadri-bharath/Taskly/blob/main/frontend/src/assets/taskCreation.png)

### **Task Panel**
![Task Panel](https://github.com/simhadri-bharath/Taskly/blob/main/frontend/src/assets/taskPanel.png)

### **Update Task**
![Update Task](https://github.com/simhadri-bharath/Taskly/blob/main/frontend/src/assets/updateTask.png)

## Author
**Simhadri Bharath**

---

