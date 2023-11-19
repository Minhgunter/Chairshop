const user=require('../models/login_model');
const bcrypt = require("bcryptjs");

module.exports.index1=function(req, res, next) {
        res.render('register/index', { title: 'Express2', subTitle: '21KTPM' });
};

module.exports.register=async(req, res)=>{
        const {username, email, password}=req.body;

        if (!email || typeof email!=='string'){
                return res.render('register/index', {message: 'Invalid Email'});
        }

        if (!username || typeof username!=='string'){
                return res.render('register/index', {message: 'Invalid Username'});
        }

        if (!password || typeof password!=='string'){
                return res.render('register/index', {message: 'Invalid Password'}); 
        }

        if (password.length<5){
                return res.render('register/index', {message: 'Password is too short!'});
        }

        const hashedPassword=await bcrypt.hash(password, 10);

        try{
                const response=await user.create({email: email, username: username, password: hashedPassword});
                console.log('User created successfully: ', response);
                return res.redirect('/reg_notif');
        }

        catch(error){
                if (error.code===11000){
                        return res.render('register/index', {message: 'This account already exists!'})
                }
        }
}
