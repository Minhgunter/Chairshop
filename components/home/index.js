const express = require('express');
const Product=require('../../models/product_model')
const Service=require('../../models/services_model');
const router = express.Router();


/* GET home page. */
router.get('/', async(req, res, next)=>{
    try{
        const results=await Product.find({}, {}).limit(3).sort({updateat: -1});
        const service=await Service.find({})
        return res.render('home/index', {products: results, user: req.user, service: service});
    }
    catch(error){
        console.log(error);
    }
});

module.exports = router;
