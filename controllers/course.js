const { runInNewContext } = require('vm');
const Course = require('../models/courses');

const course_create = async (req,res) => {
    const course = new Course(req.body);
    try {
        await course.save();
        res.status(201).json({
            message:"Course successfully created",
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
        res.json({
            data: req.course
        });
    }
    catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
};

const course_view = async (req, res) => {
    try {
        const viewCourse = await Course.find({})
        res.json({
            data: viewCourse
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = {
    course_create,
    course_delete,
    course_view
};