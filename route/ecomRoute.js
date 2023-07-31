const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { protect } = require("./auth");
const ecomController = require("../controller/ecomController");

router.post("/addProduct", ecomController.addProduct);

router.get('/allProducts',protect,ecomController.allProducts)

router.put('/updateProduct/:id',protect,ecomController.updateProduct)

router.delete('/deleteProduct/:id',protect,ecomController.deleteProduct)

module.exports = router;
