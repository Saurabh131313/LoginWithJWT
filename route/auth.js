const jwt = require('jsonwebtoken');
const User = require('../models/user')

const protect = async(req,res,next)=>{
    let token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try {
                token = req.headers.authorization.split(' ')[1]

                //verify token 

                const decode = jwt.verify(token,process.env.Token);

                req.user = await User.findById(decode.id).select('-password')
                next();
            } catch (error) {
                return res.status(401).json({message:"Not Authorized"})
        }

    }

    if(!token){
        return res.status(400).json({message:"No Token"})
    }



    
}

module.exports = {protect}

