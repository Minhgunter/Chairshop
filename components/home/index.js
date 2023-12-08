const express = require('express');
const router = express.Router();
const re=require('../../controller/productController');

/* GET home page. */
router.get('/', re.home);

module.exports = router;
