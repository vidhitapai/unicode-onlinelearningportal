const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Course = require('../models/courses');

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
    },
    enrolledIn: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course',
        default: []
    },
    coursesCreated: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Course'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//generating tokens for authentication, accessible on instances
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'justinvisiblethings');
    
    //saving token for each user 
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

//checking the credentials before logging in, accessible on models
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email});
    if(!user) {
        throw new Error('Sorry, unable to login!');
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        throw new Error('Sorry, unable to login!');
    }

    return user;
}

//hashing the plaintext password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;