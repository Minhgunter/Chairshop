const express = require('express');
const router = express.Router();
const re=require('../../controller/welcome')
const {ensureAuthenticated}=require('../../config/auth')
/* GET home page. */
router.get('/', ensureAuthenticated, re.index);

module.exports = router;