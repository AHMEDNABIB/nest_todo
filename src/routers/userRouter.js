const express = require('express');
const {getUser,getUsers,addUser,updateUser,deleteUser,loginUser,regisUser} = require('../controllers/userController');
const userRouter = express.Router();
const checkLogin = require('../middlewares/checkLogin');

userRouter.get('/users', checkLogin, getUsers );
userRouter.get('/user/:id', checkLogin, getUser );
userRouter.post('/add', checkLogin, addUser );
userRouter.put('/update/:id', checkLogin, updateUser );
userRouter.delete('/delete/:id', checkLogin, deleteUser );
userRouter.post('/login', loginUser );
userRouter.post('/register', checkLogin, addUser );

module.exports = { userRouter };