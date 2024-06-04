const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
    try{
        // await mongoose.connect(process.env.MONGODB_URL);
        await mongoose.connect('mongodb://localhost:27017/FlavourFound');
    }
    catch(err){
        console.log("DB connection failed : " + err.message);
    }
}

module.exports = connectDB;