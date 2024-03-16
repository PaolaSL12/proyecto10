require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const usersRouter = require("./src/api/routes/users");
const eventsRouter = require("./src/api/routes/events");
const attendeesRouter = require("./src/api/routes/attendees");
const cloudinary = require('cloudinary').v2
const cors = require("cors")

const app = express();

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.use(express.json())
app.use(cors())

app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);
app.use("/api/attendees", attendeesRouter)

app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found")
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
})