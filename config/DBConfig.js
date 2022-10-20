const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_LOCAL)
        console.log(`Database Connected Sucessfully`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;