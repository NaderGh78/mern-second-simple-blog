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

const corsOptions = {
    origin: [
        "http://localhost:3000", // local React 
        "https://joori-blog-1.onrender.com" // production frontend
    ],
    credentials: true
};

app.use(cors(corsOptions));

//apply middlewares
app.use(express.json());

// routes 
app.use("/api/auth", authPath);
app.use("/api/post", postPath);

// running the server
const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => { console.log(`the server is running in ${process.env.NODE_ENV} mode on port ${PORT}`) }); 