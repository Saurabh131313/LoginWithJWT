const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    userid:{type:String,unique:true,required:true},
    product:[
        {
            productId:{
                type:String,
            },
            quntity:{
                type:{
                    default:1
                }
            }
        }
    ],
    
    
},{timestamps:true})


module.exports = mongoose.model("cart",CartSchema)