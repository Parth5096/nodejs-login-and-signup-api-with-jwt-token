const express = require('express');
const router = express.Router();

// include ordercontroller
const inventory_controller = require('../index.ts');

// routes
router.get('/', inventory_controller.all_inventory);
router.post('/create', inventory_controller.inventory_create);
router.get('/:id', inventory_controller.inventory_details);
router.put('/update/:id', inventory_controller.inventory_update);
router.delete('/delete/:id', inventory_controller.inventory_delete);

module.exports = router;
