const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');
const { defaultImagePath } = require("../secret")

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minlength: [3, 'the length of user name can be minimum 3 characters'],
        maxLength: [31, 'the length of user name can be maximum 31 characters'],
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate:{
            validator: function (v) {
                return /^\S+@\S+\.\S+$/.test(v);
                message: 'please inter a valid email'
            }
        }
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minlength: [6, 'the length of user password can be minimum 6 characters'],
    },
    // image: {
    //     type: String,
    //     default:defaultImagePath,
    // },
    address:{
        type: String,
        // required: [true, 'User address is required'],
    },
    phone:{
        type: String,
        // required: [true, 'User phone is required'],
    },
    role: {
        type: String,
        enum:['admin', 'user'],
        default: 'user'
    },
    isBanned: {
        type: Boolean,
        default: false
    }
},{timestamps: true});
const User = model('Users', userSchema);
module.exports = User;