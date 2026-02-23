import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running on port: " + process.env.PORT);
});


