import express from "express";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import { connectToDB } from "./lib/db.js";
dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use("/api/auth", authRoutes);



if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend", "dist")));
    const indexFile = path.join(__dirname, "../frontend", "dist", "index.html");
    app.get("*", (req, res) => {
        res.sendFile(indexFile);
    });
}

app.listen(process.env.PORT || 3000, ()=>{
    connectToDB();
    console.log("server is running on port: " + process.env.PORT);
});


