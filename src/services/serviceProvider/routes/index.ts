const express = require('express');
const router = express.Router();

// include usercontroller
const service_controller = require('../index.ts');

// routes
router.get('/',service_controller.all_serviceProviders);
router.post('/create',service_controller.serviceProvider_create);
router.get('/:id', service_controller.serviceProviders_details);
router.put('/update/:id', service_controller.serviceProvider_update);
router.delete('/delete/:id', service_controller.serviceProvider_delete);

module.exports = router;