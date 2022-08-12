const express = require('express');
const router = express.Router();


const TransationsController = require('../index');

// Retrieve all employees
router.get('/', TransationsController.findAll);
// Create a new employee
router.post('/', TransationsController.create);
// Retrieve a single employee with id
router.get('/:id', TransationsController.findById);
// Update a employee with id
router.put('/:id', TransationsController.update);
// Delete a employee with id
router.delete('/:id', TransationsController.delete);

module.exports = router