const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    instructor: {
        type: String,
        required: true
    },
    rating: Number,
    courseType: {
        type: String,
        required: true
    },
    uploadDate: Date,
    enrolled: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Course = mongoose.model('Course', schema);

module.exports = Course;