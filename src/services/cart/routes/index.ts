const express = require('express');
const router = express.Router();

// include usercontroller
const cart_controller = require('../index.ts');

// routes
router.get('/', cart_controller.all_cart);
router.post('/create', cart_controller.cart_create);
router.get('/:id', cart_controller.cart_details);
router.put('/update/:id',cart_controller.cart_update);
router.delete('/delete/:id', cart_controller.cart_delete);

module.exports = router;