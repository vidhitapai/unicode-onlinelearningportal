const Course = require('../models/courses');

const course_create = async (req,res) => {
    const course = new Course(req.body);
    try {
        await course.save();
        res.status(201).json({
            message:"Course successfully created!",
            data: course
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_delete = async (req, res) => {
    try {
        await req.course.remove()
        res.status(201).json({
            message: "Course successfully deleted!",
            data: req.course
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_view = async (req, res) => {
    try {
        const viewCourse = await Course.find({})
        res.status(201).json({
            message: "Course found!",
            data: viewCourse
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_viewByName = async (req, res) => {
    try {
        const courseByName = await Course.find({name: req.params.name});
        res.status(201).json({
            mesage: "Course found!",
            data: courseByName
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_viewByInstructor = async (req, res) => {
    try {
        const courseByInstructor = await Course.find({instructor: req.params.instructor});
        res.status(201).json({
            mesage: "Course found!",
            data: courseByInstructor
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

module.exports = {
    course_create,
    course_delete,
    course_view,
    course_viewByName,
    course_viewByInstructor
};