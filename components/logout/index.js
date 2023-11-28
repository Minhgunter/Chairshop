const express = require('express');
const router = express.Router();
const re=require('../../controller/userController')

router.get('/', re.logout);

module.exports = router;