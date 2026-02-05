const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/client/index.html"));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});