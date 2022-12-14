var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require('dotenv').config()
//var logger = require('morgan');
const bodyParser=require('body-parser');
//const port = process.env.PORT || 8080;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./src/services/user/routes/index.ts');
var addressRouter = require('./src/services/address/routes/index.ts');
var planRouter = require('./src/services/plans/routes/index.ts');
var partnerRouter = require('./src/services/partner/routes/index.ts');
var manufacturerRouter = require('./src/services/manufacturer/routes/index.ts');
var variantsRouter = require('./src/services/variants/routes/index.ts');
var inventoryRouter = require('./src/services/inventory/index.ts');
var orderRouter = require('./src/services/order/routes/index.ts');
const { createTokens, validateToken } = require("./middleware/auth");

// wallet routes
var walletRouter = require('./src/services/wallet/routes/index');

// database connection
var databaseConnection = require('./src/database/index.ts');

var app = express();

//swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user',userRouter);
app.use('/address',addressRouter);
app.use('/plans',planRouter);
app.use('/partner',partnerRouter)
app.use('/manufaturuer',manufacturerRouter);
app.use('/variants',variantsRouter);
app.use('/order',orderRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// route for jwt token testing
app.use('/welcome', (req, res) =>{
    res.send("user is Authenticated")

})



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('connection done');
});

module.exports = app;
