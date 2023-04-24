console.log('Hospital Management System Starting...')
const express=require('express')
const mongoose=require('mongoose')
var bodyParser = require("body-parser")
const connectDB=require('./db/mongoose')
const session = require("express-session");
const routes=require('./routes/route')
const app=express();
const port=process.env.PORT || 5000
require('dotenv').config()
const db=mongoose.connection;
const { v4: uuidv4 } = require("uuid");
//console.log(db)
//middleware
app.set("view engine","ejs")
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));
app.use('/api/v1',routes)


const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.get("/",(req,res)=>{
            res.set({
                "Allow-access-Allow-Origin": '*'
            })
        }).listen(port,console.log(`listening on ${port}...`));

    } catch (error) {
        console.log('error')
    }
}


start();