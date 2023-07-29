const router = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {protect} = require('./auth')

router.get('/mm',(req,res)=>{
    res.send("The server is working fine")
})

router.post('/register',async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        if(!username || !email){
            return res.status(400).json({message:"username or email is missing"})

        }

        const user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(403).json("User Exist")
        }
        

        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            //token:generateToken(newUser.id)
        })

        await newUser.save();

        newUser.token = generateToken(newUser.id);

        return  res.status(201).json({
            Message:"User Registers Successfully",
            data:newUser,
            token:newUser.token
        })


    } catch (error) {
        return res.status(500).json(error)
    }
})


router.post('/login' ,async (req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
                return res.status(400).json({message:"username or password is missing"})
        }

        const user = await User.findOne({email:req.body.email})
        if(user){
           let submittedPassword= req.body.password;
           let storedPassword = user.password;

           const passwordMatch = await bcrypt.compare(submittedPassword,storedPassword);
           if(passwordMatch){
            res.status(200).json({
                message:"Login Successfuly",
                data:user,
                token:generateToken(user.id)
            })
           }
           else{
            res.status(401).json({
                message:"Login Failed"})
           }
        }
        else{
            res.status(403).json({message:"User Not Found"})
        }

    

    } catch (error) {
        return res.status(500).json(error)
    }

})

router.get('/protected',protect,(req,res)=>{
    return res.status(200).json({message:"this is a protected route"})

})



module.exports = router;