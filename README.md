# FinSight Backend API 🚀

A secure backend API for managing personal financial transactions with authentication, role-based access, and analytics.

## 🔧 Tech Stack

* Node.js
* Express.js
* MongoDB
* JWT Authentication

## ✨ Features

* User Authentication
* Role-Based Access (ADMIN / VIEWER)
* Financial Transactions CRUD
* Filtering (type, category)
* Analytics Summary API
* Secure JWT APIs
* User-level data protection

## 🔐 Security

Each API ensures users can only access their own data using ownership validation.

## 📦 API Endpoints

* POST /api/auth/register
* POST /api/auth/login
* GET /api/transactions
* POST /api/transactions
* GET /api/transactions/:id
* PUT /api/transactions/:id
* DELETE /api/transactions/:id
* GET /api/analytics/summary

## ⚙️ Setup

npm install
npm start

## 🧪 Testing

Use Postman with:
Authorization: Bearer token

## 👨‍💻 Author

Nikhil Eswar
