const express = require('express');
const app = express();
const ownersRoute = require('./routes/ownersRouter');
const usersRoute = require('./routes/usersRouter');
const productsRoute = require('./routes/productsRouter');
const indexRoute = require('./routes/index');
const expressSession = require('express-session');
const flash = require("connect-flash");

require('dotenv').config();

const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongoose-connnection');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}));
app.use(flash());
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");

app.use("/",indexRoute)
app.use("/owners",ownersRoute)
app.use("/users",usersRoute)
app.use("/products",productsRoute)

app.listen(3000);