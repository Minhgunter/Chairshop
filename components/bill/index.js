const express = require('express');
const router = express.Router();
const Bill=require('../../models/bill_model')

const {ensureAuthenticated}=require('../../config/auth')

router.get('/', ensureAuthenticated, async(req, res, next)=>{
    const bill=await Bill.find({username: req.user.username});
    res.render('bill/index', {user: req.user, bill: bill});
});

module.exports = router;