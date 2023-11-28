const express = require('express');
const router = express.Router();
const re=require('../../controller/userController')
/* GET home page. */
router.get('/', re.index_login);
router.get('/forgot_password', re.index_forgot_password);
router.post('/', re.login);
router.post('/forgot_password', re.reset_password);

module.exports = router;
