const express = require('express');
const router = express.Router();
const re=require('../../controller/cartController')
const {ensureAuthenticated}=require('../../config/auth')

/* GET home page. */
router.get('/', ensureAuthenticated, re.checkout);

module.exports = router;
