const mongoose = require('mongoose');

// const productSchema = mongoose.Schema({
//     image: Buffer,
//     name: String,
//     price: Number,
//     discount: {
//         type: Number,
//         default: 0
//     },
//     bgcolor: String,
//     panelcolor: String,
//     textcolor: String,
// })

const productSchema = mongoose.Schema({
    // Product Image
    image: {
        type: Buffer,
        required: true,
    },

    // Product Name
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
        errorMessage: 'Product name must be between 2 and 100 characters'
    },

    // Price
    price: {
        type: Number,
        required: true,
        errorMessage: 'Price must be between $0 and $9999999.99'
    },

    // Discount
    discount: {
        type: Number,
        default: 0,
        errorMessage: 'Discount percentage must be between 0 and 100'
    },

    // Colors
    bgcolor: {
        type: String,
        required: false,
        errorMessage: 'Background color should be less than 50 characters'
    },
    panelcolor: {
        type: String,
        required: false,
        errorMessage: 'Panel color should be less than 50 characters'
    },
    textcolor: {
        type: String,
        required: false,
        errorMessage: 'Text color should be less than 50 characters'
    },
    quantity: {
        type: Number,
        required: false,
        errorMessage: 'Stock quantity must be non-negative'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        errorMessage: 'Creation time must be a valid date'
    },
});

module.exports = mongoose.model("product",productSchema);