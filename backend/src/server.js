import express from "express";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import { connectToDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";


const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use("/api/auth", authRoutes);



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


