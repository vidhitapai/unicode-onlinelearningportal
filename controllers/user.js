const User = require('../models/users');

const user_create = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
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

const user_login = async (req, res) => {
    try {
        const user = await user.findByCredentials(req.body.email, req.body.password)
        const token = await generateAuthToken();
        res.send({ user, token });
    }
    catch(err) {
        res.status(400).send()
    }
};

const user_logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();
        res.send('Successfully logged out!');
    }
    catch (err) {
        res.status(500),send();
    }
};

const user_logoutOfAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send('Successfully logged out of all sessions!');
    }
    catch (err) {
        res.status(500).send();
    }
};

const user_update = async (req, res) => {
    
    
    try {
        //const user = await User.findOneAndUpdate(req.user);
        if (!req.user) {
            res.status(404).json({
                message: "User not found!"
            });
        }
        else if (req.user) {
            res.status(200).json({
                message: "User found!",
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

const user_delete = async (req, res) => {
    try {
        // const user = await User.findOneAndDelete({email: req.user._id});
        // if (!email) {
        //     res.status(401).json ({
        //         message: "User not found!"
        //     });
        // }
        // else if (email) {
        //     res.status(201).json({
        //         message: "User successfully deleted!",
        //         data: req.user
        //     });
        // }   
        await req.user.remove();
        res.send(req.user);
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// const user_view = async (req, res) => {
//     try {
//         const viewUser = await User.find({}).populate('enrolledIn', 'coursesCreated');
//         if (viewUser.length == 0) {
//             res.status(404).json({
//                 message: "User not found!"
//             });
//         }
//         else {
//             res.status(200).json({
//                 message: "User found!",
//                 data: viewUser
//             });
//         } 
//     }
//     catch(err) {
//         res.status(400).json({
//             message: err.message
//         });
//     }
// };

//displaying authenticated user's profile
const user_view = async (req, res) => {
    res.send(req.user);
};

// const user_viewByName = async (req, res) => {
//     try {
//         const userByName = await User.find({name: req.params.name}).populate('enrolledIn', 'coursesCreated');
//         if (userByName.length == O) {
//             res.status(404).json({
//                 message: "User not found!"
//             });
//         }
//         else {
//             res.status(201).json({
//                 mesage: "User found!",
//                 data: userByName
//             });
//         }
//     }
//     catch(err) {
//         res.status(400).json({
//             message: err.message
//         });
//     }
// };

// const user_viewByType_student = async (req, res) => {
//     try {
//         const Students = await User.find({userType: "Student"}).populate('enrolledIn', 'coursesCreated');
//         if (Students.length == 0) {
//             res.status(404).json({
//                 message: "User not found!"
//             });
//         }
//         else {
//             res.status(201).json({
//                 mesage: "Students found!",
//                 data: Students
//             });
//         }
//     }
//     catch(err) {
//         res.status(400).json({
//             message: err.message
//         });
//     }
// };

// const user_viewByType_instructor = async (req, res) => {
//     try {
//         const Instructors = await User.find({userType: "Instructor"});
//         res.status(201).json({
//             mesage: "Instructors found!",
//             data: Instructors
//         });
//     }
//     catch(err) {
//         res.status(400).json({
//             message: err.message
//         });
//     }
// };


module.exports = {
    user_create,
    user_login,
    user_logout,
    user_logoutOfAll,
    user_delete,
    user_view,
    //user_viewByName,
    //user_viewByType_student,
    //user_viewByType_instructor,
    user_update
};