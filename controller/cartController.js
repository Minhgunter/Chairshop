const Cart=require('../models/cart_model')
const Product=require('../models/product_model')
const Coupon=require('../models/coupon_model')
const Bill=require('../models/bill_model')

module.exports.cart=async(req, res, next)=>{
    const user=req.user.username;
    const cart=await Cart.findOne({customer: user}, {}).populate('products.product_info').populate('coupon');
    
    res.render('cart/index', {products: cart.products, sub_total: cart.sub_total, total_price: cart.total_price, coupon: cart.coupon, user: req.user})
}

module.exports.edit_page=async(req, res, next)=>{
    const slug=req.params.slug;
    const user=req.user.username;
    const item=await Product.findOne({slug: slug}, '_id');

    const product_id=item._id;

    const cart=await Cart.findOne({customer: user}, {products: {$elemMatch: {product_info: product_id}}}).populate('products.product_info');
        res.render('cart/edit', {products: cart.products, user: req.user});
}

module.exports.edit=async(req, res, next)=>{
    const slug=req.params.slug;
    const user=req.user.username;
    const item=await Product.findOne({slug: slug});
    const {quantity, edit}=req.body
    const cart=await Cart.findOne({customer: user}).populate('coupon');
    const get_quantity=item.stock+cart.products[0].quantity-parseInt(quantity);
    const productIndex = cart.products.findIndex(product =>
        product.product_info.equals(item._id)
      );
  
      if (productIndex === -1) {
        req.flash('error', "Item not found!");
        return res.redirect('/cart');
      }

      const quantity_get=cart.products[productIndex].quantity;
      const total_get=cart.products[productIndex].total;
    if (edit=="Delete"){
        cart.products = cart.products.filter(product =>
            !product.product_info.equals(item._id)
        );
        const total_price=cart.sub_total-total_get
        cart.sub_total=total_price;
        if (cart.coupon){
            cart.total_price=(total_price)-((total_price)*cart.coupon.discount);
        }
        else{
            cart.total_price=total_price
        }
        item.stock=item.stock+quantity_get

        item.save();
        cart.save();
        
        req.flash('message', "Deleted Item successfully!")
        return res.redirect('/cart');
        
    }


    else if (edit=="Edit"){
        if (get_quantity<0){
            req.flash('error', "Not enough stock! Come again!");
            return res.redirect('/cart');
        }

        const new_total=item.product_price*parseInt(quantity);
        const sub_price=cart.sub_total-cart.products[productIndex].total+new_total
        cart.products[productIndex].quantity = parseInt(quantity);
        cart.products[productIndex].total = new_total;

        cart.sub_total=sub_price
        if (cart.coupon){
            cart.total_price=(sub_price)-((sub_price)*cart.coupon.discount);
        }
        else{
            cart.total_price=sub_price
        }

        item.stock=get_quantity;
        item.save();
        cart.save();
       ;
        
        req.flash('message', "Updated Item successfully!")
        return res.redirect('/cart');
        
    }
}

module.exports.coupon=async(req, res, next)=>{
    const {coupon_code, coupon}=req.body;

    const coupon_get=await Coupon.findOne({coupon_code: coupon_code});
    if (coupon=="apply"){
        if (!coupon_get){
            req.flash('error', "This Coupon Code does not exist!")
            return res.redirect('/cart');
        }

        const cart=await Cart.findOne({customer: req.user.username});

        cart.coupon=coupon_get._id;
        cart.total_price=cart.sub_total-(cart.sub_total*coupon_get.discount);

        cart.save();

        req.flash('message', 'Coupon Code entered!')
        return res.redirect('/cart');
    }

    else{
        const cart=await Cart.findOne({customer: req.user.username});
        cart.coupon=undefined;
        cart.total_price=cart.sub_total;
        cart.save()

        req.flash('message', 'Coupon Code removed!')
        return res.redirect('/cart');
    }
}

module.exports.checkout=async(req, res, next)=>{
    const user=req.user.username;
    const first_name=req.user.first_name;
    const last_name=req.user.last_name;
    const country=req.user.country;
    const address=req.user.address;
    const email=req.user.email;
    const phone=req.user.phone;

    const cart=await Cart.findOne({customer: user}, {}).populate('products.product_info').populate('coupon');

    return res.render('checkout/index', {phone: phone, email: email, coupon: cart.coupon, products: cart.products, first_name: first_name, last_name: last_name, country: country, address: address, sub_total: cart.sub_total, total_price: cart.total_price, user: req.user})
}

module.exports.buy=async(req, res, next)=>{
    const username=req.user.username;

    if(!req.body.send_to){
        const country=req.body.country;
        const first_name=req.body.first_name;
        const last_name=req.body.last_name;
        const company=req.body.company;
        const address=req.body.address;
        const apartment= req.body.apartment;
        const state_county=req.body.state_county;
        const postal_zip=req.body.postal_zip;
        const email=req.body.email;
        const phone=req.body.phone;

        if (!first_name || !last_name || !country || !address || !state_county || !postal_zip || !phone || !email){
            req.flash('error', 'Some information is missing!')
            return res.redirect('/checkout');
        }

        const cart=await Cart.findOne({customer: username}).populate('products.product_info');
        const total_price=cart.total_price;
        const date = new Date().toLocaleDateString();

        const bill=new Bill({
            username: username,
            first_name: first_name,
            last_name: last_name,
            country: country,
            address: address,
            company: company,
            apartment: apartment,
            postal: postal_zip,
            email: email,
            phone: phone,
            total_price: total_price,
            shopping_date: date,
            state_county: state_county
        })

        
        for (var i=0; i<cart.products.length; i++){
            bill.products.push({product_info: cart.products[i].product_info.product_name, quantity: cart.products[i].quantity, price: cart.products[i].product_info.product_price});
        }
        cart.products=[];
        cart.sub_total=0;
        cart.total_price=0;
        cart.coupon=undefined;

        cart.save();
        bill.save();
        return res.redirect('/thanks');
    }
    

    else{
        const country=req.body.foreign_country;
        const first_name=req.body.foreign_first_name;
        const last_name=req.body.foreign_last_name;
        const company=req.body.foreign_company;
        const address=req.body.foreign_address;
        const apartment= req.body.foreign_apartment;
        const state_county=req.body.foreign_state_county;
        const postal_zip=req.body.foreign_postal_zip;
        const email=req.body.foreign_email;
        const phone=req.body.foreign_phone;

        if (!first_name || !last_name || !country || !address || !state_county || !postal_zip || !phone || !email){
            req.flash('error', 'Some information is missing!')
            return res.redirect('/checkout');
        }

        const date = new Date().toLocaleDateString();

        const cart=await Cart.findOne({customer: username}).populate('products.product_info');
        const total_price=cart.total_price;

        const bill=new Bill({
            username: username,
            first_name: first_name,
            last_name: last_name,
            address: address,
            company: company,
            apartment: apartment,
            postal: postal_zip,
            email: email,
            phone: phone,
            total_price: total_price,
            shopping_date: date,
            state_county: state_county
        })

        for (var i=0; i<cart.products.length; i++){
            bill.products.push({product_info: cart.products[i].product_info.product_name, quantity: cart.products[i].quantity, price: cart.products[i].product_info.product_price});
        }
        cart.products=[];
        cart.sub_total=0;
        cart.total_price=0;
        cart.coupon=undefined;

        cart.save();
        bill.save();
        return res.redirect('/thanks');
    }
}

module.exports.bill=async(req, res, next)=>{
    const bill=await Bill.find({})
}