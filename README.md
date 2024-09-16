# NestJS Authentication and Authorization System

This is a NestJS application that implements JWT-based authentication and authorization for both users and admins. It provides secure endpoints for user and admin login, registration, and protected routes.

## Features

- **JWT Authentication**: Secure login for users and admins using JSON Web Tokens (JWT).
- **Role-Based Access Control**: Differentiated access for users and admins.
- **Protected Routes**: Certain endpoints are protected and require a valid JWT to access.
- **Password Hashing**: Passwords are hashed before storage using bcrypt.

## Technologies Used

- **NestJS**: Framework for building efficient and scalable server-side applications.
- **TypeORM**: ORM for interacting with the database.
- **JWT**: JSON Web Tokens for authentication.
- **bcrypt**: Library for hashing passwords.

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
2. **Install Dependencies:**
```bash
npm install
4. **Set up environment variables:**
Create a .env file in the root of the project and add the following variables:
```bash
USER_SECRET_KEY=your_user_jwt_secret_key
ADMIN_SECRET_KEY=your_admin_jwt_secret_key
6. **Run the application:**
```bash
npm run start
7. **Contributing**

Feel free to fork the repository and submit pull requests. For significant changes, please open an issue to discuss the proposed changes before submitting a pull request.

9. **License**

This project is licensed under the MIT License - see the LICENSE file for details.

