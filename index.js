const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/helper/data.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({ 
        status: 'success',
        result: tours.length,
        tours
     });
});

app.get('/api/v1/tours/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tour = tours.find(tour => tour.id === id);

    res.status(200).json({ 
        status: 'success',
        tour,
     });
});

app.post('/api/v1/tours', (req, res) => {
    console.log(req.body);
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newID }, req.body);

    fs.writeFile(fs.readFileSync(`${__dirname}/helper/data.json`), JSON.stringify(newTour), (error) => {
        if(error) console.log(error.message);

        res.status(200).json({
            status: 'success',
            result: tours.length,
            data: {
                newTour
            }
        })
    })
});

const Port = process.env.Port;
app.listen(Port, (error) => {
    if(error) console.log(error.message);

    console.log(`Server Running on ${Port} Port`);
});