const express = require('express');
const router = express.Router();
const re=require('../../controller/userController')

/* GET home page. */
router.get('/',re.index_register);
router.post('/', re.register);

module.exports = router;