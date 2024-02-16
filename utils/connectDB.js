const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
    }
    catch(err){
        console.log("DB connection failed : " + err.message);
    }
}

module.exports = connectDB;