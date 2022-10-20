const getAllUsers = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        msg: 'Not Implemented yet!'
     });
}

const getUser = (req, res) => {
    const id = parseInt(req.params.id);

    res.status(500).json({ 
        status: 'error',
        msg: 'Not Implemented yet!'
     });
}

const addUser = (req, res) => {
    const newID = tours[tours.length - 1].id + 1;
    res.status(500).json({ 
        status: 'error',
        msg: 'Not Implemented yet!'
     });
}

const updateUser = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        msg: 'Not Implemented yet!'
     });
}

const deleteUser = (req, res) => {
    res.status(500).json({ 
        status: 'error',
        msg: 'Not Implemented yet!'
     });
}

module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };