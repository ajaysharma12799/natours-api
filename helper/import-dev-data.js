const fs = require('fs');
const TourModel = require('../models/tours.models');
const connectDB = require('../config/DBConfig');

require('dotenv').config();
connectDB();

// Read File
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));

// Import Data into DB
const importData = async () => {
    try {
        await TourModel.create(tours);
        console.log('Data is Sucessfully Loaded');
    } catch (error) {
        console.log(error.message);
    }
    process.exit(1);
}

// Delete All Data
const deleteData = async () => {
    try {
        await TourModel.deleteMany();
        console.log('Data Deleted Sucessfully');
    } catch (error) {
        console.log(error.message);
    }
    process.exit(1);
}

if(process.argv[2] === '--import') {
    importData();
}
else if(process.argv[2] === '--delete') {
    deleteData();
}