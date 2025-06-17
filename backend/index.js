import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = process.env.PORT || 6000;
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ API is running");
});

// Connect to DB and start server
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to start server due to DB error:', err.message);
  });
