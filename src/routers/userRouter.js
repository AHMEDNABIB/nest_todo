const express = require('express');
const {getUser,getUsers,addUser,updateUser,deleteUser,loginUser,regisUser} = require('../controllers/userController');
const userRouter = express.Router()

userRouter.get('/users', getUsers );
userRouter.get('/user/:id', getUser );
userRouter.post('/add', addUser );
userRouter.put('/update/:id', updateUser );
userRouter.delete('/delete/:id', deleteUser );
userRouter.post('/login', loginUser );
userRouter.post('/register', addUser );

module.exports = { userRouter };