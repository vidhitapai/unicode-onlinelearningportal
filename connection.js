const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

const connectionParameters = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

const url = process.env.MONGODB_URL;

const connection = mongoose.connect(url, connectionParameters)
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.log(err));