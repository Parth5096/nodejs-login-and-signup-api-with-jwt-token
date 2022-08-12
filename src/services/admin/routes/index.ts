const express = require('express');
const router = express.Router();

// include usercontroller
const admin_controller = require('../index.ts');

// routes
router.get('/', admin_controller.all_admin);
router.post('/create', admin_controller.admin_create);
router.get('/:id', admin_controller.admin_details);
router.put('/update/:id', admin_controller.admin_update);
router.delete('/delete/:id', admin_controller.admin_delete);

module.exports = router;