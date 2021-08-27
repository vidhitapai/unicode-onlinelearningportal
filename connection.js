const mongoose = require('mongoose')

const connectionParameters = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

const url = 'mongodb+srv://primehide:maximus@cluster0.tq0vb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connection = mongoose.connect(url, connectionParameters)
    .then(() => console.log("Server is active!!"))
    .catch((err) => console.log(err));