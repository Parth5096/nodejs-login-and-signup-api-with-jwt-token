const express = require('express');
const router = express.Router();

// include usercontroller
const category_controller = require('../index.ts');

// routes
router.get('/', category_controller.all_categorys);
router.post('/create', category_controller.category_create);
router.get('/:id', category_controller.category_details);
router.put('/update/:id',category_controller.category_update);
router.delete('/delete/:id', category_controller.category_delete);

module.exports = router;