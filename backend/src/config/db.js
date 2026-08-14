// nconst mongoose = require('mongoose')

// const connectDB = async () => {
//   // const mongoUri = process.env.MONGODB_URI ||'mongodb+srv://shahkhushii110_db_user:Test123456@cluster0.wahtvmb.mongodb.net/'
//   // console.log(process.env.MONGODB_URI,"process.env.MONGODB_URI");
  
//   const mongoUri = 'mongodb+srv://shahkhushii110_db_user:5qL5Y4rxSmRNGMYX@cluster0.idhev7y.mongodb.net/'
//   try {
//     const conn = await mongoose.connect(mongoUri)
//     console.log(`✅ MongoDB connected: ${conn.connection.host}`)
//   } catch (err) {
//     console.error('❌ MongoDB connection error:', err.message)
//     console.log('⚠️  Server will run without MongoDB. Some features may not work.')
//   }
// }

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};


module.exports = connectDB
