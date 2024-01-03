const express = require('express');
const router = express.Router();
const re=require('../../controller/productController')
const {ensureAuthenticated}=require('../../config/auth')

/* GET home page. */
router.get('/', re.shop);

router.get('/search', re.search);

router.get('/shop/search', re.search);

router.get('/:slug', re.details)

router.get('/:slug/order', ensureAuthenticated, re.order_page)

router.post('/:slug/order', ensureAuthenticated, re.order)

module.exports = router;
