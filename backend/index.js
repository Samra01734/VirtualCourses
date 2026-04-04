import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDb from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";
import userRouter from "./route/userRoute.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

// ✅ DEBUG (IMPORTANT)
console.log("✅ INDEX FILE RUNNING");

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ TEST ROUTE (VERY IMPORTANT)
app.get("/api/user/test", (req, res) => {
  res.send("User route working ✅");
});

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// ✅ Root test
app.get("/", (req, res) => {
  res.send("Server Working ✅");
});

// ✅ Start Server
app.listen(port, async () => {
  console.log(`🚀 Server started on port ${port}`);
  await connectDb();
});