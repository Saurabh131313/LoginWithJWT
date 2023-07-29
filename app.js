const  dotenv  = require('dotenv');
const express= require('express');
const port = 3000;
const app = express();
const db = require('./db/db')
const router = require('./route/routes')
const userSchema= require('./models/user')
db();

dotenv.config({path:"./.env"})

app.use(express.json());

//routes
app.use('/route',router)


app.listen(port,(req,res)=>{
    console.log("Server is runnig at 3000");
})
