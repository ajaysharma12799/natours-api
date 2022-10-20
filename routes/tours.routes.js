const { getAllTours, getTour, addTour, updateTour, deleteTour } = require('../controllers/tours.controller');

const router = require('express').Router();

router.route('/')
    .get(getAllTours)
    .post(addTour);

router.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;