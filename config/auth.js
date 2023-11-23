module.exports = {
    ensureAuthenticated: function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        }

        req.flash('message', 'You must be logged in!');
        return res.redirect('/login');;
    }
}