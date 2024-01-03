const User=require('../models/user_model');
const Cart=require('../models/cart_model')
const bcrypt = require('bcryptjs');
const passport=require('passport');

module.exports.index_register=function(req, res, next) {
        const {email, username, password}=req.body;
        res.render('register/index', { title: 'Express2', subTitle: '21KTPM', email: email, username: username, password: password });
};

module.exports.register=async(req, res)=>{
        const {email, username, password, password2}=req.body;

        if (!email||!username||!password||!password2){
                req.flash('message', 'Please fill all the empty area!')
                return res.redirect('/register');
        }

        if (password!==password2){
                req.flash('message', 'Passwords do not match!')
                return res.redirect('/register');
        }

        if (password.length<6){
                req.flash('message', "Password's length must be 6 or more!")
                return res.redirect('/register');
        }

        User.findOne({email: email}).then(user=>{
                if (user){
                        req.flash('message', "This Email is already used!")
                        return res.redirect('/register');
                }
        
        });
        User.findOne({username: username}).then(user=>{
                if (user){
                        req.flash('message', "This Username is already used!")
                        return res.redirect('/register');
                }
        })
        const newUser=new User({
                email: email,
                username: username,
                password: password
        });

        bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if (err){
                                req.flash('message', "Failed to encrypt!")
                                return res.redirect('/register');
                        }

                        newUser.password=hash;

                        newUser.save().then(user=>{
                                const newCart=new Cart({
                                        customer: newUser.username
                                });
                                newCart.save();
                                return res.redirect('/reg_notif');
                        }).catch(err=>console.log(err));
                })
        })
}


module.exports.index_login=function(req, res, next) {
        res.render('login/index', { title: 'Express2', subTitle: '21KTPM'});
};

module.exports.login=(req, res, next) => {
        const url='/welcome/'+req.body.username;
        passport.authenticate('local',{      
                successRedirect: url,
                failureRedirect: '/login',
                failureFlash: true
        })(req, res, next);
}

module.exports.index_profile=function(req, res, next) {
        var username=req.params.username;
        if (username!==req.user.username){
                return res.render('error', {message: 'This URL is invalid!'});
        }

        User.findOne({username: req.user.username}).then(user=>{
                const email=user.email;
                const first_name=user.first_name;
                const last_name=user.last_name;
                const country=user.country;
                const address=user.address;
                const contact=user.contact;
                const phone=user.phone;
                const dateofbirth=user.dateofbirth;
                const gender=user.gender;

                return res.render('account/index', { title: 'Express2', subTitle: '21KTPM', 
                username: req.user.username, email: email, first_name: first_name, last_name: last_name, country: country, address: address, contact: contact, phone: phone, dateofbirth: dateofbirth, gender: gender});
        })
}

module.exports.redirect_profile=function(req, res, next) {
        return res.redirect('/account/'+req.user.username)
}

module.exports.index_edit=function(req, res, next) {
        var username=req.params.username;
        if (username!==req.user.username){
                return res.render('error', {message: 'This URL is invalid!'});
        }

        User.findOne({username: req.user.username}).then(user=>{;
                const first_name=user.first_name;
                const last_name=user.last_name;
                const country=user.country;
                const address=user.address;
                const contact=user.contact;
                const phone=user.phone;
                const dateofbirth=user.dateofbirth;
                const gender=user.gender;

                return res.render('account/edit', { title: 'Express2', subTitle: '21KTPM', 
                username: req.user.username, first_name: first_name, last_name: last_name, country: country, address: address, contact: contact, phone: phone, dateofbirth: dateofbirth, gender: gender});
        })
}

module.exports.edit_profile=(req, res, next)=>{
        const {first_name, last_name, country, address, contact, phone, dateofbirth, gender}=req.body;

        const username=req.user.username;
        const filter={username: username};

        User.findOneAndUpdate(filter, {first_name: first_name, last_name: last_name, country: country, address: address, contact: contact, phone: phone,  dateofbirth: dateofbirth, gender: gender}, {  useFindAndModify: false }).then(document=>{
                if (!document){
                        req.flash('Cannot update profile!')
                        return res.redirect('/account/'+req.user.username+'/edit');
                }

                req.flash('message', 'Updated successfully!')
                return res.redirect('/account/'+req.user.username);
        }).catch(err=>console.log(err));
}

module.exports.index_forgot_password=function(req, res, next){
        return res.render('login/forget_password', { title: 'Express2', subTitle: '21KTPM'});
}

module.exports.reset_password=async(req, res, next)=>{
        const {email, password}=req.body;
        User.findOne({email: email}).then(user=>{
                if (!user){
                        req.flash('message', "This Account dooes not exist!")
                        return res.redirect('/login/forgot_password');
                }
        })
        bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(password, salt, async(err, hash)=>{
                        if (err){
                                req.flash('message', "Failed to encrypt!")
                                return res.redirect('/login/forgot_password');
                        }

                        User.findOneAndUpdate({email: email}, {password: hash}, {  useFindAndModify: false }).then(document=>{
                                if (!document){
                                        req.flash('message','Cannot update password!')
                                        return res.redirect('/login/forgot_password');
                                }
                
                                req.flash('message', 'Password reset!')
                                return res.redirect('/login');
                        }).catch(err=>console.log(err));
                })
        })
}

module.exports.logout=(req, res)=>{
    req.logout(function(err){
        if (err){
                return console.log(err);
        }   
        req.flash('message', "You have logged out!")
        return res.redirect('/login');
    });

}