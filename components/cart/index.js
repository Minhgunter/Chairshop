const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cart/index', { title: 'Express2', subTitle: '21KTPM' });
});

router.get('/:id', function(req, res, next) {
  res.render('cart/index');
});
module.exports = router;