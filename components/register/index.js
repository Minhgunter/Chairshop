const express = require('express');
const router = express.Router();
const re=require('../../controller/userController')

/* GET home page. */
router.get('/user/',re.index_register);
router.post('/user/', re.register);

module.exports = router;