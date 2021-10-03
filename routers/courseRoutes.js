const express = require ('express');
const courseController = require('../controllers/course');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/createcourse', auth, courseController.course_create);
router.delete('/deletecourse/:name', auth, courseController.course_delete);
router.get('/view', courseController.course_view);
router.get('/view/self', auth, courseController.course_viewEnrolledIn);
router.get('/view/:id', courseController.course_viewById);
//router.get('/instructor/:instructor', courseController.course_viewByInstructor);
router.put('/updatecourse/:name', courseController.course_update);

module.exports = router;