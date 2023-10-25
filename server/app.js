const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express')
const app = express();
const connectDB = require("./db/connect");

dotenv.config({ path: './config.env' });

app.use(express.json());

app.use(require('./router/auth'));
app.use(require('./router/recip'));

app.get('/contact', (req, res) => {
    res.send("Hello contact");
});

app.listen(3001, () => {
    console.log("Server");
}
)