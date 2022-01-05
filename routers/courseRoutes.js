const express = require ('express');
const multer = require ('multer');
const auth = require('../middleware/auth');
const {
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
} = require('../controllers/course');

const router = new express.Router();

router.post('/createcourse', [auth.JWTauth, auth.checkUserType], course_create);
router.post('/course-upload-file', [auth.JWTauth, auth.checkUserType], uploadFile.single('file'), course_upload_file);
router.post('/course-upload-video', [auth.JWTauth, auth.checkUserType], uploadVideo.single('video'), course_upload_video);
router.delete('/deletecourse/:id', [auth.JWTauth, auth.checkUserType], course_delete);
router.get('/view', course_view);
router.get('/view/enrolled', [auth.JWTauth, auth.checkUserType], course_viewEnrolledIn);
router.get('/view/:id', course_viewById);
router.get('/viewinstructor', [auth.JWTauth, auth.checkUserType], course_viewByInstructor);
router.put('/updatecourse/:id', [auth.JWTauth, auth.checkUserType], course_update);

module.exports = router;