const User=require('../models/user_model');
const bcrypt = require('bcryptjs');
const passport=require('passport');

module.exports.index=function(req, res, next) {
        res.render('login/index', { title: 'Express2', subTitle: '21KTPM'});
};

module.exports.login=(req, res, next) => {
        passport.authenticate('local',{      
            successRedirect: '/welcome',
            failureReDirect: '/login',
            failureFlash: true
        })(req, res, next);
    }

