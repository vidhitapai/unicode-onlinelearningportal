const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    userType: String,
    email: String,
    enrolledIn: [String],
    coursesCreated: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = Student;
module.exports = Instructor;