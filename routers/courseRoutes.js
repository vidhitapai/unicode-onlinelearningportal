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
    course_viewById,
    course_update
} = require('../controllers/course');

const router = new express.Router();

router.post('/createcourse', auth, course_create);
router.post('/course-upload-file', auth, uploadFile.single('file'), course_upload_file);
router.post('/course-upload-video', auth, uploadVideo.single('video'), course_upload_video);
router.delete('/deletecourse/:name', auth, course_delete);
router.get('/view', course_view);
router.get('/view/self', auth, course_viewEnrolledIn);
router.get('/view/:id', course_viewById);
//router.get('/instructor/:instructor', courseController.course_viewByInstructor);
router.put('/updatecourse/:name', course_update);

module.exports = router;