const express = require('express');
const router = express.Router();

// include usercontroller
const sku_controller = require('../index.ts');

// routes
router.get('/', sku_controller.all_skus);
router.post('/create', sku_controller.sku_create);
router.get('/:id', sku_controller.sku_details);
router.put('/update/:id', sku_controller.sku_update);
router.delete('/delete/:id', sku_controller.sku_delete);

module.exports = router;