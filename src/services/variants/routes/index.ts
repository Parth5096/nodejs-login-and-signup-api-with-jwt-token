const express = require('express');
const router = express.Router();

// include usercontroller
const variants_controller = require('../index.ts');

// routes
router.get('/', variants_controller.all_variants );
router.post('/create', variants_controller.variants_create);
router.get('/:id',variants_controller.variants_details);
router.put('/update/:id', variants_controller.variants_update);
router.delete('/delete/:id', variants_controller.variants_delete);

module.exports = router;