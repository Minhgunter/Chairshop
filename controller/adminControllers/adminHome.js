module.exports.admin_home=async(req, res, next)=>{
    if (req.user.admin){
        return res.render('admin/index', {layout: 'adminLayout', user: req.user})
    }

    else{
        return res.render('admin/restricted')
    }
}
