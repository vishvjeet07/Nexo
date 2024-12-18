const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParse = require('cookie-parser');
const { has } = require('config');
const {generateToken} = require("../utils/generateToken");
const userModel = require('../models/user-model');
const productModel = require('../models/product-model');

module.exports.registerUser = async function(req,res){
    try{
        let products = await productModel.find();
        let {email, password, fullname} = req.body;
        let success = req.flash("sunccess");
        let user = await userModel.findOne({email: email});
        if(user) return res.status(401).send("you already have an account ");

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err) return res.send(err.messege);
                else{
                    let newUser = await userModel.create({
                        email,
                        password:hash,
                        fullname
                    });
                    let token = generateToken(newUser);
                    res.cookie("token",token);
                    res.render('shop',{ products, success });
                }
            });
        });
} catch(err){
    res.send(err.messege);
}
}

module.exports.loginUser = async function(req,res){
    let products = await productModel.find();
    let {email, password} = req.body;
    let success = req.flash("sunccess");
    let user = await userModel.findOne({email: email});
    if(!user) return res.send("Email or Pasword incorrect ");
    
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie("token",token);
           res.render('shop',{ products, success });
        }
        else{
            res.send("Email or Password is Incorrect");
        }
    })
}

module.exports.logout = function(req,res){
    res.cookie("token","");
    res.redirect('/');
}
