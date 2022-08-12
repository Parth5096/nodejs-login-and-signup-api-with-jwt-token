const express = require('express');
const router = express.Router();

// include usercontroller
const cartline_controller = require('../index.ts');

// routes
router.get('/', cartline_controller.all_cartline);
router.post('/create', cartline_controller.cartline_create);
router.get('/:id', cartline_controller.cartline_details);
router.put('/update/:id',cartline_controller.cartline_update);
router.delete('/delete/:id', cartline_controller.cartline_delete);

module.exports = router;