const mongoose = require('mongoose');


// const userSchema = mongoose.Schema({
//     fullname: String,
//     email: String,
//     password: String,
//     cart:[
//         {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "product",
//     }
// ],
//     orders:{
//         type:Array,
//         default:[]
//     },
//     contact: Number,
//     picture: String,
// })
const userSchema = mongoose.Schema({
    // Basic Information
    fullname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
        trim: true,
        errorMessage: 'Fullname must be between 2 and 100 characters'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: 'Invalid email format'
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 128,
        errorMessage: 'Password must be between 8 and 128 characters'
    },

    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }]}
);

module.exports = mongoose.model("users",userSchema);