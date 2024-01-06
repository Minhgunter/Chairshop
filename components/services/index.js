const express = require('express');
const Product=require('../../models/product_model')
const Service=require('../../models/services_model')
const router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next)=>{
  const results=await Product.find({}, {}).limit(3).sort({updateat: -1});
  const service=await Service.find({})
  res.render('services/index', {products: results, service: service, user: req.user});
});

router.get('/:id', function(req, res, next) {
  res.render('services/index');
});
module.exports = router;
