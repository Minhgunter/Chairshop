const express = require('express');
const router = express.Router();
const re=require('../../controller/reg_notif')
/* GET home page. */
router.get('/', re.index);

module.exports = router;