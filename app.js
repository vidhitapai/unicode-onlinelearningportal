const express = require('express');
const app = express();
require('./connection');

const userRouter = express.Router();

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is active!')
});

