const mongoose = require('mongoose');

// const ownerSchema = mongoose.Schema({
//     fullname: String,
//     email: String,
//     password: String,
//     products: {
//         type:Array,
//         default:[]
//     },
//     picture: String,
//     gstin: String,
// })

const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        errorMessage: 'Fullname must be between 2 and 50 characters'
    },
    email: {
        type: String,
        required: true,
        email: true,
        errorMessage: 'Invalid email format'
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        errorMessage: 'Password must be at least 8 characters long'
    },
});

module.exports = mongoose.model("owner",ownerSchema);