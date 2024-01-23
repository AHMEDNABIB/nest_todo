const express = require("express");
const app = express();
const morgan = require("morgan");
const createError = require('http-errors');
const { userRouter } = require("./routers/userRouter");
const cors = require('cors');

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }));

app.use('/api/user', userRouter);
app.get('/',()=>{
    console.log('home');
})

app.use((req, res, next)=>{
    next(createError(404,'route not found'));
});
app.use((err, req, res, next)=>{
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    })
});

module.exports =app;