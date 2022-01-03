const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

const connectionParameters = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

let url;
// Changing environment and database according to purpose
if (process.env.NODE_ENV === "test") {
    url = process.env.TEST_MONGODB_URL;
} else if (process.env.NODE_ENV === "production") {
    url = process.env.MONGODB_URL
}

const connection = mongoose.connect(url, connectionParameters)
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.log(err));