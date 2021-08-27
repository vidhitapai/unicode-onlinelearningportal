const express = require ('express');
const courseController = require('../controllers/course');

const router = new express.Router();

router.post('/createcourse', courseController.course_create);
router.delete('/deletecourse', courseController.course_delete);
router.get('viewcourse', courseController.course_view);

module.exports = router;