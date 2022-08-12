const express = require('express');
const router = express.Router();

// include ordercontroller
const order_controller = require('../index.ts');

// routes
router.get('/', order_controller.all_order);
router.post('/create', order_controller.order_create);
router.get('/:id', order_controller.order_details);
router.put('/update/:id',order_controller.order_update);
router.delete('/delete/:id', order_controller.order_delete);

module.exports = router;
