const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { protect } = require("../route/auth");
const bcrypt = require('bcryptjs')


module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email) {
      return res.status(400).json({ message: "username or email is missing" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(403).json("User Exist");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      //token:generateToken(newUser.id)
    });

    newUser.token = generateToken(newUser.id);
    await newUser.save();


    return res.status(201).json({
      Message: "User Registers Successfully",
      data: newUser,
      token: newUser.token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "username or password is missing" });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      let submittedPassword = req.body.password;
      let storedPassword = user.password;

      const passwordMatch = await bcrypt.compare(
        submittedPassword,
        storedPassword
      );
      if (passwordMatch) {
        res.status(200).json({
          message: "Login Successfuly",
          data: user,
          token: generateToken(user.id),
        });
      } else {
        res.status(401).json({
          message: "Login Failed",
        });
      }
    } else {
      res.status(403).json({ message: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.update = async(req,res) =>{
    try {
        const reqestObj = req.body;
        const changeuser = await User.findByIdAndUpdate({_id: req.params.id },{
            $set:{
                "username":reqestObj.username
            }
        });
        const updaatedUser= await changeuser.save();

        
        return res.status(200).send({
            code: "200",
            msg: "user updated successfully",
            data: updaatedUser
          });
    } catch (error) {
        return res.status(500).json(error);
    }

}

module.exports.delete = async(req,res)=>{
    try {
        const reqestObj = req.body;
        const deleteUser = await User.findByIdAndDelete({_id:req.params.id});
        const deletedUser= deleteUser.save(); 

        return res.status(200).send({
            code: "200",
            msg: "user Deleted successfully",
            data: deletedUser
        });
    } catch (error) {
        return res.status(500).json(error);
    }

}


const generateToken=  (id)=>{
    return jwt.sign({id},process.env.Token,{expiresIn:'30d'})
}