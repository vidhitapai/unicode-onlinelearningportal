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
        const course = await Course.findOneAndDelete({name: req.params.name});
        if (!course) {
            res.status(401).json ({
                message: "Course not found!"
            });
        }
        else if (course) {
            res.status(201).json({
                message: "Course successfully deleted!",
                data: course
            });
        }
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_view = async (req, res) => {
    try {
        const viewCourse = await Course.find({}).populate('enrolled');
        if (viewCourse.length == 0) {
            res.status(404).json({
                message: "Course not found!"
            });
        }
        else {
            res.status(201).json({
                message: "Course found!",
                data: viewCourse
            });
        } 
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_viewByName = async (req, res) => {
    try {
        const courseByName = await Course.find({name: req.params.name}).populate('enrolled');
        if (courseByName.length == 0) {
            res.status(404).json({
                message: "Course not found!"
            });
        }
        else {
            res.status(201).json({
                mesage: "Course found!",
                data: courseByName
            });
        }
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_viewByInstructor = async (req, res) => {
    try {
        const courseByInstructor = await Course.find({instructor: req.params.instructor}).populate('enrolled');
        if (courseByInstructor.length == 0) {
            res.status(404).json({
                message: "Course not found!"
            });
        }
        else {
            res.status(201).json({
                mesage: "Course found!",
                data: courseByInstructor
            });
        }  
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_update = async (req, res) => {
    try {
        const course = await User.findOneAndUpdate({name: req.params.name}, req.body, {new: true});
        if (!user) {
            res.status(404).json({
                message: "Course not found!"
            });
        }
        else if (user) {
            res.status(200).json({
                message: "Course found!",
                data: course
            });
        }
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
    course_viewByInstructor,
    course_update
};