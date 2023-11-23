const express = require('express');
const router = express.Router();
const {ensureAuthenticated}=require('../../config/auth')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('account/index', { title: 'Express2', subTitle: '21KTPM' });
});

router.get('/:id', function(req, res, next) {
  res.render('account/index');
});
module.exports = router;
