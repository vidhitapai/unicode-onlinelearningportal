// Importing modules
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../models/users.js');
const Course = require('../../models/courses.js');
const { course_viewById } = require('../../controllers/course');
const dotenv = require('dotenv').config();

// Creating dummy database
const userID = new mongoose.Types.ObjectId();
const courseID = new mongoose.Types.ObjectId();

const user = {
    _id: userID,
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "iamjohndoe",
    userType: "INSTRUCTOR",
    enrolledIn: courseID,
    tokens: [{token: jwt.sign({ _id: userID.toString() }, process.env.JWT_KEY)}]
};

const course = {
    _id: courseID,
    name: "Learn Web-Dev",
    instructor: userID,
    courseType: "Web Development",
    rating: "4"
};

const dbReq = async () => {
    await User.deleteMany();
    await Course.deleteMany();
    await new User(user).save();
    await new Course(course).save();
};

module.exports = {
    user,
    course,
    dbReq
};