const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');  // Add this line to import the path module





const app = express();
const connectDB = require("./db/connect");

dotenv.config({ path: './config.env' });

app.use(express.json({ }));
app.use(express.urlencoded({  }));

app.use(require('./router/auth'));
app.use(require('./router/recip'));
app.use(require('./router/blogsbackend'));
app.use('/image', express.static(path.join(__dirname, 'uploads')));






app.get('/contact', (req, res) => {
    res.send("Hello contact");
});


app.listen(3001, () => {
    console.log("Server");
}
)