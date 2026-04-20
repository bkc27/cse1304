require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"])
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API RUNNING");
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const postRoutes = require("./routes/postRoutes");
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    // console.log("Server started at http://localhost:"+PORT);
    console.log(`Server started at http://localhost:${PORT}`);
});