const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/DBConfig');
const app = express();

if(process.env.NODE_ENV === 'developement') {
    require('dotenv').config();
}

/** 
 * 
 * express.json() is a Middleware which is used to parse incoming request with JSON Payload
 * 
*/
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
connectDB();

// Routes
app.use('/api/v1/tours', require('./routes/tours.routes'));
app.use('/api/v1/users', require('./routes/user.routes'));

const Port = process.env.Port;
app.listen(Port, (error) => {
    if(error) console.log(error.message);

    console.log(`Server Running on ${Port} Port`);
});