const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    author: String,
    rating: Number
});

const Course = mongoose.model('Course', schema);

module.exports = Course;