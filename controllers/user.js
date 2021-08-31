const User = require('../models/users');

const user_create = async (req,res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).json({
            message:"User successfully created!",
            data: user
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const user_delete = async (req, res) => {
    try {
        const email = req.body;
        const user = await User.findOneAndDelete({email});
        if (!email) {
            res.status(401).json ({
                message: "User not found!"
            });
        }
        else if (email) {
            res.status(201).json({
                message: "User successfully deleted!",
                data: req.user
            });
        }   
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const user_view = async (req, res) => {
    try {
        const viewUser = await User.find({})
        res.status(201).json({
            message: "User found!",
            data: viewUser
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const user_viewByName = async (req, res) => {
    try {
        const userByName = await User.find({name: req.params.name});
        res.status(201).json({
            mesage: "User found!",
            data: userByName
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const user_viewByType_student = async (req, res) => {
    try {
        const Students = await User.find({userType: "Student"});
        res.status(201).json({
            mesage: "Students found!",
            data: Students
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const user_viewByType_instructor = async (req, res) => {
    try {
        const Instructors = await User.find({userType: "Instructor"});
        res.status(201).json({
            mesage: "Instructors found!",
            data: Instructors
        });
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

module.exports = {
    user_create,
    user_delete,
    user_view,
    user_viewByName,
    user_viewByType_student,
    user_viewByType_instructor
};