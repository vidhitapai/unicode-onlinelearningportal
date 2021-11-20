const Course = require('../models/courses');
const multer = require('multer');

const course_create = async (req,res) => {
    //const course = new Course(req.body);
    const course = new Course({
        ...req.body,
        instructor: req.user._id
    })
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
    destination: '../uploads/files',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
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
    destination: '../uploads/videos', 
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
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
        res.send(req.files);
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_upload_video = async (req, res) => {
    try {
        res.send(req.files);
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const course_delete = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({_id: req.params.id, instructor: req.user._id});
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
const course_viewById = async (req, res) => {
    try {
        //const courseByName = await Course.find({name: req.params.name}).populate('enrolled');
        const courseById = await Course.findOne({ _id, instructor: req.user._id });
        if (!courseById) {
            res.status(404).json({
                message: "Course not found!"
            });
        }
        else {
            res.status(201).json({
                message: "Course found!",
                data: courseByName
            });
        }
    }
    catch(err) {
        res.status(500).json({
            message: err.message
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
        const course = await User.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).populate('enrolled').execPopulate();
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
    uploadFile,
    uploadVideo,
    course_upload_file,
    course_upload_video,
    course_delete,
    course_view,
    course_viewEnrolledIn,
    course_viewById,
    //course_viewByInstructor,
    course_update
};