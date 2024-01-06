const express = require('express');
const Services=require('../../models/services_model')
const router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next)=>{
  const services=await Services.find({})
  res.render('about/index', { user: req.user, services: services});
});

module.exports = router;
