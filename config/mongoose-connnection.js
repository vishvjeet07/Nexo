const mongoose = require('mongoose');
const config = require('config');

const dbgr = require('debug')("development:mongoose");

mongoose.connect('mongodb+srv://vishverse07:b60QvQjeKufbHwwJ@cluster0.wrha7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;