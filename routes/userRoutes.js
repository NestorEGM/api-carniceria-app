const router = require('express').Router();
const { createUserController, loginController, getUsersController, getUserController, updateUserController, deleteUserController } = require('../controllers/userController');
// Auth
router.post('/signup', createUserController);
router.post('/login', loginController);
// CRUD
router.get('/user', getUsersController);
router.get('/user/:id', getUserController);
router.put('/user/:id', updateUserController);
router.delete('/user/:id', deleteUserController);

module.exports = router;