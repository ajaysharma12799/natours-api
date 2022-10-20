const { getAllUsers, getUser, addUser, updateUser, deleteUser } = require('../controllers/user.controller');

const router = require('express').Router();

router.route('/')
    .get(getAllUsers)
    .post(addUser);

router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;