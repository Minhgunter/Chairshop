const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const homeRouter = require('./components/home');
const shopRouter = require('./components/shop');
const aboutRouter = require('./components/about');
const servicesRouter = require('./components/services');
const blogRouter = require('./components/blog');
const contactRouter = require('./components/contact');
const cartRouter = require('./components/cart');
const checkoutRouter = require('./components/checkout');
const thanksRouter = require('./components/thanks');
const accountRouter = require('./components/account');
const adminRouter = require('./components/admin');
const loginRouter = require('./components/login');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/shop', shopRouter);
app.use('/about', aboutRouter);
app.use('/services', servicesRouter);
app.use('/blog', blogRouter);
app.use('/contact', contactRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/thanks', thanksRouter);
app.use('/account', accountRouter);
app.use('/admin', adminRouter);
app.use('/login', loginRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
