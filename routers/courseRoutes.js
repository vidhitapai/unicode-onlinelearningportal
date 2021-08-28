const express = require ('express');
const courseController = require('../controllers/course');

const router = new express.Router();

router.post('/createcourse', courseController.course_create);
router.delete('/deletecourse/:name', courseController.course_delete);
router.get('/view', courseController.course_view);
router.get('/name/:name', courseController.course_viewByName);
router.get('/instructor/:instructor', courseController.course_viewByInstructor);

module.exports = router;