const Product=require('../models/product_model');
const Tag=require('../models/tag_model');
const Cart=require('../models/cart_model')
const Company=require('../models/company_model')

module.exports.home=async(req, res, next)=> 
{
    try{
        const results=await Product.find({}, {}).limit(3).sort({updateat: -1});
        
        return res.render('home/index', {products: results, user: req.user});
    }
    catch(error){
        console.log(error);
    }
};

module.exports.shop=async(req, res, next)=> 
{
    try{
        const tags=await Tag.find({}, {});
        const company=await Company.find({}, {});
        const results=await Product.find({}, {});
        
        return res.render('shop/index', {products: results, tags: tags, company: company, user: req.user});
    }
    catch(error){
        console.log(error);
    }
};

module.exports.search=async(req, res, next)=>
{
    try{
        const tags=await Tag.find({}, {});
        const company=await Company.find({}, {});

        const search=req.query.product;
        const tag=req.query.tag;
        const selected_company=req.query.company;
        
        const company_found=await Company.findOne({company: selected_company}, '_id')
        
        const tag_list=await Tag.find({tag: tag}, 'tag')
        if (tag!=undefined && company_found!=null){
            const products=await Product.find({product_name: { $regex: search, $options: "i" }, tags: tag, company: company_found._id})
            return res.render('shop/index', {search: search, products: products, tags: tags, company: company, tag_list: tag, selected_company: selected_company, user: req.user});
        }

        if (company_found==null && tag!=undefined){
            const products=await Product.find({product_name: { $regex: search, $options: "i" }, tags: tag});  
            return res.render('shop/index', {search: search, products: products, tags: tags, company: company, tag_list: tag, selected_company: selected_company, user: req.user});
        }

        if (tag==undefined && company_found!=null){
            const products=await Product.find({product_name: { $regex: search, $options: "i" }, company: company_found._id});
            return res.render('shop/index', {search: search, products: products, tags: tags, company: company, tag_list: tag, selected_company: selected_company, user: req.user});
        }

        if (tag==undefined && company_found==null){
            const products=await Product.find({product_name: { $regex: search, $options: "i" }});
            
            return res.render('shop/index', {search: search, products: products, tags: tags, company: company, tag_list: tag, selected_company: selected_company, user: req.user});
        }
    }
    catch(error){
        console.log(error);
    }
}


module.exports.details=async(req, res, next)=>
{
    const slug=req.params.slug;
    try{
        const found=await Product.findOne({slug: slug});
        if (!found){
            return res.render('shop/detail')
        }
        const product_name=found.product_name;
        const product_price=found.product_price;
        const description=found.description;
        const stock=found.stock;
        const image=found.image;
        const tags=found.tags;

        return res.render('shop/detail', {product_name: product_name, product_price: product_price, description: description, image: image, stock: stock, tags: tags, slug: slug, user: req.user});
    }
    catch(error){
        return console.log(error);
    }
}

module.exports.order_page=async(req, res, next)=>{
    const slug=req.params.slug;
    try{
        const found=await Product.findOne({slug: slug})
        const product_name=found.product_name;
        const product_price=found.product_price;

        return res.render('shop/order', {product_name: product_name, product_price: product_price, user: req.user})
    }
    catch(error){
        return console.log(error)
    }
}

module.exports.order=async(req, res, next)=>{
    const user=req.user.username;
    const {product_name, quantity}=req.body;
    
    const get_quantity=parseInt(quantity);
    
    const found_product=await Product.findOne({product_name: product_name});
    const slug=found_product.slug;
    
    if (found_product.stock<quantity){
        req.flash('message', 'Not enough stock! Come back later!')
        return res.redirect('/shop/'+slug)
    }
    if (quantity==0){
        req.flash('message', "You haven't ordered any products!")
        return res.redirect('/shop/'+slug+'/order')
    }
    const total=found_product.product_price*get_quantity;
    const product_id=found_product._id;
    const cart=await Cart.findOne({customer: user}).populate('coupon');
    const total_price=cart.sub_total+total
    cart.products.push({product_info: product_id, quantity: get_quantity, total: total});
    cart.sub_total=total_price;
    if (cart.coupon){
        cart.total_price=(total_price)-((total_price)*cart.coupon.discount);
    }
    else{
        cart.total_price=total_price
    }
        const stock=found_product.stock-quantity;
    
    found_product.stock=stock
    found_product.save();
    cart.save();
    
    req.flash('message', "Thank you for ordering!")
    return res.redirect('/cart')
};
