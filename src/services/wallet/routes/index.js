const express = require('express');
const router = express.Router();

// include usercontroller
const wallet_controller = require('../index');

// routes
router.get('/', wallet_controller.all_wallet );
router.post('/create', wallet_controller.wallet_create);
router.get('/:user_id',wallet_controller.wallet_details);
router.put('/update/:user_id', wallet_controller.wallet_update);
router.delete('/delete/:user_id', wallet_controller.wallet_delete);

module.exports = router;