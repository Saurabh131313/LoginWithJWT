const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { protect } = require("./auth");
const userController = require("../controller/userController");

router.get("/mm", (req, res) => {
  res.send("The server is working fine");
});


router.post("/register", userController.register);

router.post("/login",protect, userController.login);

router.put("/update/:id",protect, userController.update)

router.delete('/delete/:id',protect,userController.delete)
 
// Product Routes

router.get("/protected", protect, (req, res) => {
  return res.status(200).json({ message: "this is a protected route" });
});

module.exports = router;
