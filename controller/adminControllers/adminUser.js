const User=require('../../models/user_model')
const Cart=require('../../models/cart_model')
const Bill=require('../../models/bill_model')

module.exports.admin_users=async(req, res, next)=>{
    if (req.user.admin){
        const users=await User.find({});
        return res.render('admin/users', {layout: 'adminLayout', user: req.user, users: users})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.bill=async(req, res, next)=>{
    if (req.user.admin){
        const user=req.params.username;
        const bill=await Bill.find({username: user});
        return res.render('admin/bill', {layout: 'adminLayout', user: req.user, bill: bill})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.delete=async(req, res, next)=>{
    const {delete_user}=req.body

    if (delete_user==req.user.username){
        req.flash('error', 'You cannot delete your own account!');
        return res.redirect('/admin/users')
    }

    const deleteBill=await Bill.deleteMany({username: delete_user});
    const deleteCart=await Cart.findOneAndDelete({customer: delete_user});
    const deleteUser=await User.findOneAndDelete({username: delete_user});
        
    req.flash('message', 'Deleted Account!');
    return res.redirect('/admin/users');
}