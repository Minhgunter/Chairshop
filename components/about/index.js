const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about/index', { title: 'Express2', subTitle: '21KTPM' });
});

router.get('/:id', function(req, res, next) {
  res.render('about/index');
});
module.exports = router;
