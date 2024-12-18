const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');


router.get('/',function(req,res){
    res.render("owner-login");
})
/*if(process.env.NODE_ENV === "development"){
    router.post('/create',async function(req,res){
        console.log("working");
        
        let owners = await ownerModel.find();
        if(owners.length > 0){
        return res
            .status(503)
            .send("uou dont have permission to create owner")
        }
        let{fullname,email,password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
    });
} */

router.get('/adminpanel', function (req, res) {
    const { email, password } = req.query; // Extract email and password
    
        // Perform validation or logic here
    if (email === "thevish7@gmail.com" && password === "abc") {
        res.render('admin'); // Render admin view on successful login
    } else {
        res.send("Invalid credentials"); // Handle login failure
    }
});
    

router.get('/admin',function(req,res){
    let success = req.flash("success");
    res.render("createproducts",{ success });
})




module.exports = router;