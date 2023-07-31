const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    title:{type:String,unique:true,required:true},
    desc:{type:String},
    img:{type:String},
    categories:{type:Array},
    size:{type:String},
    color:{type:String,required:true},
    price:{type:Number,required:true},
},{timestamps:true})


module.exports = mongoose.model("product",ProductSchema)