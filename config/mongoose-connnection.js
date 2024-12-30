const mongoose = require('mongoose');
const config = require('config');

const dbgr = require('debug')("development:mongoose");

mongoose.connect(`${config.get("mongodb+srv://vishverse07:mVTugjpzlzLwqSJT@nexo.qgiwp.mongodb.net/?retryWrites=true&w=majority&appName=Nexo")}/sneakers`)
.then(function(){
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;