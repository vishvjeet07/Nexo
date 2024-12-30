const express = require('express');
const app = express();
const ownersRoute = require('./routes/ownersRouter');
const usersRoute = require('./routes/usersRouter');
const productsRoute = require('./routes/productsRouter');
const indexRoute = require('./routes/index');
const registerRoute = require('./routes/register');
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
    secret: process.env.EXPRESS_SESSION_SECRET, // Replace with your secret key
    resave: false,             // Prevent session resaving if not modified
    saveUninitialized: false,  // Don't save empty sessions
  }));
app.use(flash());
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Kuchh To Galat Hai!');
});

app.use("/",indexRoute)
app.use('/registerpage',registerRoute)
app.use("/owners",ownersRoute)
app.use("/users",usersRoute)
app.use("/products",productsRoute)

app.listen(3000)