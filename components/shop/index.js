const express = require('express');
const router = express.Router();
const re=require('../../controller/productController')
const {ensureAuthenticated}=require('../../config/auth')

/* GET home page. */
router.get('/', re.shop);

router.get('/tags/:tag', re.catalog);

router.get('/:slug', re.details)

router.get('/:slug/order', ensureAuthenticated, re.order_page)

module.exports = router;
