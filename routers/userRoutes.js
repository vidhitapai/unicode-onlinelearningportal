const express = require ('express');
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/createuser', userController.user_create);
router.post('/login', userController.user_login);
router.post('/logout', auth, userController.user_logout);
router.post('/logoutAll', auth, userController.user_logoutOfAll);
router.delete('/deleteuser/ :name', auth, userController.user_delete);
router.get('/view/me', auth, userController.user_view);
router.get('/view/name/:name', auth, userController.user_viewByName);
router.get('/view/student/', auth, userController.user_viewByType_student);
router.get('/view/instructor/', auth, userController.user_viewByType_instructor);
router.put('/updateuser/:email', auth, userController.user_update);

module.exports = router;