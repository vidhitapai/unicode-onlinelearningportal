const express = require ('express');
const multer = require ('multer');
const auth = require('../middleware/auth');
const {
    user_create,
    upload,
    user_upload_profilePicture,
    user_login,
    user_logout,
    user_logoutOfAll,
    user_update,
    user_delete,
    user_view
} = require('../controllers/user');

const router = new express.Router();

router.post('/createuser', user_create);
router.post('/profilePicture', auth, upload.single('profilePicture'), user_upload_profilePicture);
router.post('/login',user_login);
router.post('/logout', auth, user_logout);
router.post('/logoutAll', auth, user_logoutOfAll);
router.put('/update/self', auth, user_update);
router.delete('/delete/self', auth, user_delete);
router.get('/view/self', auth, user_view);
// router.get('/view/name/:name', auth, userController.user_viewByName);
// router.get('/view/student/', auth, userController.user_viewByType_student);
// router.get('/view/instructor/', auth, userController.user_viewByType_instructor);


module.exports = router;