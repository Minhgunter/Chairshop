module.exports.index=function(req, res, next) {
    var username=req.params.username;
    if (username!==req.user.username){
        return res.render('error', {message: 'This URL is invalid!'});
    }

    return res.render('welcome', {username: req.user.username});
};