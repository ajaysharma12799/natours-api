const fs = require('fs');
const tours = require('../helper/data.json');

const getAllTours = (req, res) => {
    res.status(200).json({ 
        status: 'success',
        result: tours.length,
        tours
     });
}

const getTour = (req, res) => {
    const id = parseInt(req.params.id);
    const tour = tours.find(tour => tour.id === id);

    res.status(200).json({ 
        status: 'success',
        tour,
     });
}

const addTour = (req, res) => {
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newID }, req.body);

    fs.writeFile(fs.readFileSync(`${__dirname}../helper/data.json`), JSON.stringify(newTour), (error) => {
        if(error) console.log(error.message);

        res.status(200).json({
            status: 'success',
            result: tours.length,
            data: {
                newTour
            }
        })
    })
}

const updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        msg: "Update Request"
    })
}

const deleteTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        msg: "Delete Request"
    })
}

module.exports = { getAllTours, getTour, addTour, updateTour, deleteTour };