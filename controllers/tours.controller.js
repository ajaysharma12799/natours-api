const TourModel = require('../models/tours.models');

const getAllTours = async (req, res) => {
    // Basic Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'filter', 'sort', 'limit'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    try {
        let query = TourModel.find(JSON.parse(queryStr));

        // Sorting
        if(req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }
        else {
            query = query.sort('-createdAt');
        }

        // Field Limiting
        if(req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        }
        else {
            query = query.select('-__v');
        }
        /**
         * Selecting or Removing Fields with select Method is known as Projection
        */

        // Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if(req.query.page) {
            const numOfPage = await TourModel.countDocuments();
            if(skip >= numOfPage) throw new Error("This Page Does't Exist");
        }

        const tours = await query;
        res.status(200).json({ 
            status: 'success',
            result: tours.length,
            data: {
                tours
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message
        })
    }
}

const getTour = async (req, res) => {
    try {
        const id = req.params.id;
        const tour = await TourModel.findById(id);

        res.status(200).json({ 
            status: 'success',
            data: {
                tour,
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error.message
        })
    }
}

const addTour = async (req, res) => {
    try {
        const newTour = await TourModel.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                tour: newTour,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
}

const updateTour = async (req, res) => {
    try {
        const id = req.params.id;
        const tour = await TourModel.findByIdAndUpdate(id, req.body, {
            new: true, // Always Return Updated Document
            runValidators: true, // Run Validator on New Value Again
        })

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })   
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
}

const deleteTour = async (req, res) => {
    try {
        const id = req.params.id;
        const tour = await TourModel.findByIdAndDelete(id)

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })   
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
}

module.exports = { getAllTours, getTour, addTour, updateTour, deleteTour };