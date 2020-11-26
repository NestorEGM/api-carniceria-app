const router = require('express').Router();
const { createUserController, loginController, getUsersController, getUserController, updateUserController, deleteUserController } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/AuthMiddleware');

// Auth
router.post('/signup', createUserController);
router.post('/login', loginController);

// CRUD
router.get('/user', verifyToken, getUsersController);
router.get('/user/:id', verifyToken, getUserController);
router.put('/user/:id', verifyToken, updateUserController);
router.delete('/user/:id', verifyToken, deleteUserController);

module.exports = router;