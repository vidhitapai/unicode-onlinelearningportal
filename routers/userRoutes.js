const express = require ('express');
const userController = require('../controllers/user');

const router = new express.Router();

router.post('/createuser', userController.user_create);
router.delete('/deleteuser', userController.user_delete);
router.get('/view', userController.user_view);
router.get('/view/name/:name', userController.user_viewByName);
router.get('/view/student/', userController.user_viewByType_student);
router.get('/view/instructor/', userController.user_viewByType_instructor);

module.exports = router;