const express = require("express");
const authPath = require("./routes/authRoute");
const postPath = require("./routes/postRoute");
const connectDB = require('./config/db');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
connectDB();
const cors = require("cors");

/*===============================*/
/*===============================*/
/*===============================*/

// init app
const app = express();

app.use(cors());

//apply middlewares
app.use(express.json());

// routes 
app.use("/api/auth", authPath);
app.use("/api/post", postPath);

// running the server
const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => { console.log(`the server is running in ${process.env.NODE_ENV} mode on port ${PORT}`) }); 