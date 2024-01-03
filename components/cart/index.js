const express = require('express');
const router = express.Router();
const re=require('../../controller/cartController')
const {ensureAuthenticated}=require('../../config/auth')

/* GET home page. */
router.get('/', ensureAuthenticated, re.cart);
router.get('/:slug/edit', ensureAuthenticated, re.edit_page);
router.post('/:slug/edit', ensureAuthenticated, re.edit);
router.post('/', ensureAuthenticated, re.coupon)

module.exports = router;
