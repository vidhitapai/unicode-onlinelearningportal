const Course = require('../models/courses');
const User = require('../models/users');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const course_create = async (req, res) => {
    //const course = new Course(req.body);
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

const fileStorage = multer.diskStorage({
    destination: '../public/uploads/documents/',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '_' + Date.now());
    }
});

const uploadFile =  multer({
    storage: fileStorage,
    limits: {
      fileSize: 10000000
    },
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.pdf|doc|docx|odt|ppt/)) {
            return callback(new Error('Please upload the correct file format!'));
        }
        callback(undefined, true);
    }
});

const videoStorage = multer.diskStorage({
    destination: '../public/uploads/videos', 
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '_' + Date.now());
    }
});

const uploadVideo =  multer({
    storage: videoStorage,
    limits: {
      fileSize: 500000000
    },
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.mp4|mkv|mpeg/)) {
            return callback(new Error('Please upload the correct file format!'));
        }
        callback(undefined, true);
    }
});

const course_upload_file = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Document uploaded successfully'
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_upload_video = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Video uploaded successfully'
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_delete = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            res.status(401).json ({
                message: "Course not found!"
            });
        }
        else if (course) {
            res.status(200).json({
                message: "Course successfully deleted!"
                //data: course
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
                message: "Courses not found!"
            });
        }
        else {
            res.status(200).json({
                message: "Courses found!",
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

//view courses user is enrolled in
const course_viewEnrolledIn = async (req, res) => {
    try {
        await req.user.populate('courses').execPopulate();
        res.send(req.user.courses);
    }
    catch (err) {
        res.status(400).json({
            messade: err.message
        });
    }
};

//view courses created by instructor
const course_viewByInstructor = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        
        const courseById = await Course.find({instructor: user._id});
        if (!courseById) {
            res.status(400).json({
                message: "Course not found!"
            });
        }
        else {
            res.status(200).json({
                message: "Course found!",
                data: courseById
            });
        }
    }
    catch(err) {
        res.status(400).json({
            message: err.message
        });
    }
};


//view course by id
const course_viewById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            res.status(404).json({
                message: "Course not found!"
            });
        } else {
            res.status(200).json({
                message: "Course found!",
                data: course
            });
        }
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// const course_viewByInstructor = async (req, res) => {
//     try {
//         const courseByInstructor = await Course.find({instructor: req.params.instructor}).populate('enrolled');
//         if (courseByInstructor.length == 0) {
//             res.status(404).json({
//                 message: "Course not found!"
//             });
//         }
//         else {
//             res.status(201).json({
//                 mesage: "Course found!",
//                 data: courseByInstructor
//             });
//         }  
//     }
//     catch(err) {
//         res.status(400).json({
//             message: err.message
//         });
//     }
// };

const course_update = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('enrolled');
        if (!course) {
            res.status(404).json({
                message: "Course not found!"
            });
        }
        else if (course) {
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
    uploadFile,
    uploadVideo,
    course_upload_file,
    course_upload_video,
    course_delete,
    course_view,
    course_viewEnrolledIn,
    course_viewByInstructor,
    course_viewById,
    course_update
};