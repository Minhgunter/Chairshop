const User=require('../models/user_model');
const bcrypt = require("bcryptjs");


module.exports.index1=function(req, res, next) {
        const {email, username, password, password2}=req.body;
        res.render('register/index', { title: 'Express2', subTitle: '21KTPM', email: email, username: username, password: password });
};

module.exports.register=async(req, res)=>{
        
        let errors=[];

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
        })

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
                                res.redirect('/reg_notif');
                        }).catch(err=>console.log(err));
                })
        })
}
