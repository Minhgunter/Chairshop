const express = require('express');
const router = express.Router();
const re=require('../../controller/register')

/* GET home page. */
router.get('/',re.index1);
router.post('/', re.register);

module.exports = router;