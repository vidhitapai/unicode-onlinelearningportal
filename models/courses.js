const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    instructor: {
        type: String,
        required: true
    },
    rating: Number,
    courseType: {
        type: String,
        //required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now(),
    },
    enrolled: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
});

const Course = mongoose.model('Course', schema);

module.exports = Course;