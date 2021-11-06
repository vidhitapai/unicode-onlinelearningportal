const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
    },
    file: [{
        type: Buffer
    }],
    video: [{
        type: Buffer
    }]
});

const Course = mongoose.model('Course', schema);

module.exports = Course;