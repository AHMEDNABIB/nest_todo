const express = require("express");
const {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  googleSignIn,
} = require("../controllers/userController");
const userRouter = express.Router();
const checkLogin = require("../middlewares/checkLogin");

userRouter.get("/users", checkLogin, getUsers);
userRouter.get("/user/:id", checkLogin, getUser);
userRouter.post("/add", checkLogin, addUser);
userRouter.put("/:id", checkLogin, updateUser);
userRouter.delete("/:id", checkLogin, deleteUser);
userRouter.post("/login", loginUser);
userRouter.post("/register", addUser);
userRouter.post("/googleSignIn", googleSignIn);

module.exports = { userRouter };
