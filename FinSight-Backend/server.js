const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env
dotenv.config();

// App init
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/transactions", require("./src/routes/transactions"));
app.use("/api/analytics", require("./src/routes/analytics"));

// ✅ Root route (homepage)
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 FinSight Backend API</h1>
    <p>Status: Running ✅</p>
    <p><a href="/demo">👉 View Demo</a></p>
  `);
});

// ✅ Demo route
app.get("/demo", (req, res) => {
  res.json({
    status: "API is working 🚀",
    endpoints: {
      register: "/api/auth/register",
      login: "/api/auth/login",
      transactions: "/api/transactions",
      analytics: "/api/analytics/summary"
    }
  });
});

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});