const createError = require('http-errors');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getUsers = async(req,res,next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).send({
            message: 'users were returned',
            users,
        })
    } catch (error) {
        next(error)
    }
}


const getUser = async(req,res,next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        res.status(200).send({
            message: userId,
            user,
        })
    } catch (error) {
        next(error)
    }
}
const addUser = async (req, res, next) => {
    try {
        const { name, email, password, phone, address} = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                message: 'User with this email already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            address,
            phone,
        });

        const savedUser = await newUser.save();
        res.status(201).send({
            message: 'User added successfully',
            user: savedUser,
        });
    } catch (error) {
        next(error);
    }
};
const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { name, email, password, address, phone, role } = req.body;

        const fieldsToUpdate = {
            name,
            email,
            password: password && await bcrypt.hash(password, 10),
            address,
            phone,
            role,
        };

        const updatedUser = await User.findByIdAndUpdate(userId, fieldsToUpdate, { new: true});

        if (!updatedUser) {
            return res.status(404).send({
                message: 'User not found',
            });
        }

        res.status(200).send({
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async(req, res, next) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.status(200).send({
            message: 'user was deleted successfully',
        })
    } catch (error) {
        next(error)
    }
}
const loginUser = async(req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            const isValidPassword = await bcrypt.compare(req.body.password, user.password)
            if(isValidPassword){
                const token = jwt.sign({
                    email: user.email,
                    id: user.id,
                },process.env.JWT_SECRET,{
                    expiresIn: '1h'
                })
                res.status(200).json({
                    "access token": token,
                    message: 'logged in successfully',
                    user
                })
            }
            else{
                res.status(401).json({
                    "error": "Authentication failed",
                })
            }
        }
        else{
            res.status(401).json({
                "error": "Authentication failed",
            })
        }
    } catch (error) {
        next(error)
    }
}


module.exports = {getUsers,getUser,addUser,updateUser,deleteUser,loginUser};