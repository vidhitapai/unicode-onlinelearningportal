const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    userType: String,
    email: String,
    isEnrolled: Boolean
});

const Student = mongoose.model('Student', userSchema);
const Instructor = mongoose.model('Instructor', userSchema);

module.exports = Student;
module.exports = Instructor;