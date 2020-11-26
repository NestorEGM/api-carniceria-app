const router = require('express').Router();
const { createUserController, getUsersController, getUserController, updateUserController, deleteUserController } = require('../controllers/userController');

router.post('/user', createUserController);
router.get('/user', getUsersController);
router.get('/user/:id', getUserController);
router.put('/user/:id', updateUserController);
router.delete('/user/:id', deleteUserController);

module.exports = router;