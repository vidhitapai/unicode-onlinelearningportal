const express = require('express');
const app = express();
require('./connection');

const userRouter = require('./routers/courseRoutes');

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;

//course routes
app.use('/courses', userRouter);


app.listen(port, () => {
    console.log('Server is active!')
});

