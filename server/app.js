const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');





const app = express();
const connectDB = require("./db/connect");

dotenv.config({ path: './config.env' });

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(require('./router/auth'));
app.use(require('./router/recip'));
app.use(require('./router/blogsbackend'));




app.get('/contact', (req, res) => {
    res.send("Hello contact");
});


app.listen(3001, () => {
    console.log("Server");
}
)