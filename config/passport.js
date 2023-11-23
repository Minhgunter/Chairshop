const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const User=require('../models/user_model');

module.exports=function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'username', passwordField: 'password'},(username, password, done)=>{
            User.findOne({username: username}).then(user=>{
                if (!user){
                    return done(null, false, 'Wrong username or password!')
                }

                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if (err) throw err;

                    if (isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, 'Wrong username or password!');
                    }
                });
            }).catch(err=>console.log(err));
        })
    );

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done)=>{
        User.findById(id).then(user=>{
            done(null, user);
        })   
    });
}