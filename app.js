const express = require('express')
const app = express();

const cookieParser = require('cookie-parser')
const path = require('path')
const mongoDB = require('./config/mongoose-connection')
const ownersRouter = require('./routes/owner.router')
const usersRouter = require('./routes/users.router')
const productsRouter = require('./routes/products.router')
const indexRouter = require('./routes/index')
const expressSession = require('express-session')
const flash = require('connect-flash')
require('dotenv').config();

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")))
app.use(expressSession({
    resave:false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,

}))
app.use(flash())


// Routes

app.use("/",indexRouter);
app.use("/api/v1/owners",ownersRouter);
app.use("/api/v1/users",usersRouter);
app.use("/api/v1/products",productsRouter);

app.listen(8080)