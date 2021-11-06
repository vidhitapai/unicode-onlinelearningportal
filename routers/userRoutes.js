const express = require ('express');
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/createuser', userController.user_create);
router.post('/profilePicture', auth, userController.upload.single('profilePicture'), userController.user_upload_profilePictureVVVVVV);
router.post('/login', userController.user_login);
router.post('/logout', auth, userController.user_logout);
router.post('/logoutAll', auth, userController.user_logoutOfAll);
router.put('/update/self', auth, userController.user_update);
router.delete('/delete/self', auth, userController.user_delete);
router.get('/view/self', auth, userController.user_view);
// router.get('/view/name/:name', auth, userController.user_viewByName);
// router.get('/view/student/', auth, userController.user_viewByType_student);
// router.get('/view/instructor/', auth, userController.user_viewByType_instructor);


module.exports = router;