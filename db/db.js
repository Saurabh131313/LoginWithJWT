const mongoose = require('mongoose');

const connectDB = async ()=>{

try {
    const conn = await mongoose.connect('mongodb+srv://saurabhg1500:12345@cluster0.thqplfz.mongodb.net/register?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}
        
    );
    console.log("Database Connected")

} catch (error) {
    console.log(error)
    process.exit
}
}
module.exports= connectDB;

