const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

// Public route (IMPORTANT FOR DEMO)
app.get('/', (req, res) => {
  res.send('🚀 FinSight Backend API is LIVE');
});

// Public demo route (NO AUTH)
app.get('/demo', async (req, res) => {
  const Transaction = require('./src/models/Transaction');

  const data = await Transaction.find().limit(5);
  res.json(data);
});

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/transactions', require('./src/routes/transactions'));
app.use('/api/analytics', require('./src/routes/analytics'));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
app.get("/", (req, res) => {
  res.send("FinSight Backend API is running 🚀");
});

app.get("/demo", (req, res) => {
  res.json({
    message: "FinSight API working",
    endpoints: [
      "/api/auth/register",
      "/api/auth/login",
      "/api/transactions",
      "/api/analytics/summary"
    ]
  });
});