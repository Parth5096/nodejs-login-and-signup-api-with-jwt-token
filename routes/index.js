var express = require('express');
var router = express.Router();
const auth_controller = require('../src/api/login/index.ts');
const authentication = require('../src/api/signup/index');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// for otp login
router.post('/login', auth_controller.auth);
router.post('/verifyotp', auth_controller.verify);
router.get('/test',auth_controller.test)

// for signup
router.post('/signup', authentication.signup );


module.exports = router;
