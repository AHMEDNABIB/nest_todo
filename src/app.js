const express = require("express");
const app = express();
const morgan = require("morgan");
const createError = require('http-errors');
const bodyParser = require("body-parser");
const { userRouter } = require("./routers/userRouter");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

app.get('/test', (req,res)=>{
    res.status(200).send({
        message: '(get)api test',
    });
});


//client error handling
app.use((req, res, next)=>{
    next(createError(404,'route not found'));
});
//server error handling
app.use((err, req, res, next)=>{
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    })
});

module.exports =app;