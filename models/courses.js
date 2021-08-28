const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: Number,
    name: String,
    instructor: String,
    rating: Number,
    type: String,
    uploadDate: String,
    enrolled: Number
});

const Course = mongoose.model('Course', schema);

module.exports = Course;