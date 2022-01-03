const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const db = require('./connection');


const courseRouter = require('./routers/courseRoutes');
const userRouter = require('./routers/userRoutes');

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;

app.use(express.json());

//import routes
app.use('/courses', courseRouter);
app.use('/users', userRouter);

//error handling for incorrect routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, () => {
    console.log('Server is active!')
});

