const express = require('express');
const isLoggedin = require('../middleware/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const { use } = require('./productsRouter');
const router = express.Router();

router.use(express.urlencoded({extended: true}));
router.get("/",function(req,res){
    let error = req.flash("error");
    res.render('userlogin',{error, loggedin:false });
})

router.get('/shop', isLoggedin, async function(req, res) {
    try {
        // Get the filter query parameter
        const filter = req.query.filter;
        const selectedoption = req.query.sortby;
        let products;
        if (filter === 'discount') {
            // Fetch only products with a discount
            products = await productModel.find({ discount: { $gt: 0 } });
        } else {
            // Fetch all products by default
            products = await productModel.find();
        }

        // Get any success flash messages
        let success = req.flash("success");

        // Render the shop page with the products
        res.render("shop", { success, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.get('/cart',isLoggedin, async function(req,res){
    let user = await userModel.findOne({email : req.user.email}).populate("cart");    
    res.render("cart", { user });
});

router.get('/account',isLoggedin, async function(req,res){
    let user = await userModel.findOne({email : req.user.email}); 
    res.render("userprofile", { user });
});

router.get('/addtocart/:productid',isLoggedin , async function(req,res){
    let user = await userModel.findOne({email : req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","added to cart");
    res.redirect("/shop");
});



module.exports = router;