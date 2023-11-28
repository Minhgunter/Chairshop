const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.render('home/index', { title: 'Express2', subTitle: '21KTPM' });
});

module.exports = router;
