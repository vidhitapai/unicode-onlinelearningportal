const mongoose = require('mongoose')
const validate = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userType: String,
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true, 
        lowercase: true,
        validate(value) {
            if(!validate.isEmail(value)) {
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 15
    },
    enrolledIn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    coursesCreated: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;