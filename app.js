var express = require("express")
var app = express();
var bodyParser = require("body-parser")
//app.use(bodyParser.urlencoded({extended: true}));
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 

dotenv.config()
const authRoutes = require('./routes/auth')
app.use(bodyParser.json())


app.use('/api/user', authRoutes)



mongoose.connect(process.env.DB)
.then(app.listen(5001))
.catch(err=>console.log(err))