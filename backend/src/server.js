import express from "express";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import messgaeRoutes from "./routes/message.route.js";
import { connectToDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";


const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/message", messgaeRoutes);


if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend", "dist")));
    const indexFile = path.join(__dirname, "../frontend", "dist", "index.html");
    app.get("*", (req, res) => {
        res.sendFile(indexFile);
    });
}

app.listen(ENV.PORT, ()=>{
    connectToDB();
    console.log("server is running on port: " + ENV.PORT);
});


