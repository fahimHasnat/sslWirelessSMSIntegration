const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

///Routes
// const Auth = require('./routes/auth');
const Send = require('./routes/send');

///Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, responseType,charset=utf-8'
    );
    next();
});

///Routing Handler
// app.use(Auth);
app.use(Send);

///Error Handler
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

const axios = require("axios");
app.get('/wow', (req, res) => {
    let payload = {
        message: "অর্ডার",
        phnNumber: "01746094342",
        orderID: 322
    }
    axios.post("http://localhost:8001/send", payload).then(response => {
        res.send(response);
    }).catch(err => {
        res.send(err);
    })
})

app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`);
});