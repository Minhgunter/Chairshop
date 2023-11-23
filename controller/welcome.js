module.exports.index=function(req, res, next) {
    res.render('welcome/index', { title: 'Express2', subTitle: '21KTPM', username: req.user.username});
};