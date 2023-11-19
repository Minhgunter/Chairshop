const express = require('express');
const router = express.Router();
const re=require('../../controller/login')
/* GET home page. */
router.get('/', re.index);

module.exports = router;
