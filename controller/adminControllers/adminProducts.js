const Cart=require('../../models/cart_model')
const Product=require('../../models/product_model')
const Coupon=require('../../models/coupon_model')
const Tags=require('../../models/tag_model');
const Company=require('../../models/company_model')

const upload=require('../../config/multer');
const { ObjectId } = require('mongodb');

module.exports.admin_products=async(req, res, next)=>{
    if (req.user.admin){
        const products=await Product.find({}).populate('company');
        const tags=await Tags.find({})
        const companies=await Company.find({})
        const coupons=await Coupon.find({})
        return res.render('admin/products', {layout: 'adminLayout', user: req.user, products: products, tags: tags, companies: companies, coupons: coupons})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.new_product=async(req, res, next)=>{
    if (req.user.admin){
        const tags=await Tags.find({});
        const company=await Company.find({});
        return res.render('admin/new_product', {layout: 'adminLayout', user: req.user, tags: tags, company: company})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.add_product=async(req, res, next)=>{
    upload(req, res, async (err)=>{
        if (err){
            req.flash('error', 'Cannot upload images!');
            return res.redirect('/admin/products/new')
        }

        if (!req.file){
            req.flash('error', 'Image not selected!');
            return res.redirect('/admin/products/new')
        }

        const {product_name, product_price, slug, stock, description, tags, company}=req.body;
        if (!product_name || !product_price || !slug || !stock || !description){
            req.flash('error', 'Missing information!');
            return res.redirect('/admin/products/new')
        }
        const price=parseInt(product_price);
        const get_stock=parseInt(stock)

        const image=req.file.filename;
        
        const get_company=await Company.findOne({company: company});

        const new_product=new Product({
            product_name: product_name,
            product_price: price,
            stock: get_stock,
            image: image,
            description: description,
            tags: tags,
            slug: slug
        })

        if (get_company){
            new_product.company=get_company._id
        }
        new_product.save();
        req.flash('message', 'New Product added!');
        return res.redirect('/admin/products')
    })
}

module.exports.edit_product=async(req, res, next)=>{
    if (req.user.admin){
        const slug=req.params.slug;
        const tags=await Tags.find({});
        const company=await Company.find({});

        const product=await Product.findOne({slug: slug}).populate("company");

        return res.render('admin/edit_product', {layout: 'adminLayout', user: req.user, tags: tags, company: company, product_name: product.product_name, product_price: product.product_price, stock: product.stock, slug: product.slug, tag_list: product.tags, selected_company: product.company, description: product.description})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.edit=async(req, res, next)=>{
    upload(req, res, async (err)=>{
        const def_slug=req.params.slug;
        if (err){
            req.flash('error', 'Cannot upload images!');
            return res.redirect('/admin/products/'+def_slug+'/edit')
        }
        
        const {product_name, product_price, slug, stock, description, tags, company}=req.body;
        if (!product_name || !product_price || !slug || !stock || !description){
            req.flash('error', 'Missing information!');
            return res.redirect('/admin/products/'+def_slug+'/edit')
        }
        const product=await Product.findOne({slug: def_slug})
        const id=product._id
        if (product_price){
            const price=parseInt(product_price);
            product.product_price=price;
        }

        if (stock){
            const get_stock=parseInt(stock)
            product.stock=get_stock
        }
        
        if (company){
            const get_company=await Company.findOne({company: company});
            product.company=get_company._id;
        }
        
        if (product_name){
            product.product_name=product_name;
        }

        if (product_name){
            product.product_name=product_name;
        }

        if (description){
            product.description=description;
        }

        if (tags){
            product.tags=tags;
        }
        
        if (slug){
            product.slug=slug;
        }
        if (req.file){
            product.image=req.file.filename;
        }
        product.save();

        const cart=await Cart.find({'products.product_info': id}).populate('products.product_info').populate('coupon')
        for (var i=0; i<cart.length; i++){
            const productIndex = cart[i].products.findIndex(product =>
                product.product_info.equals(id)
            );

            cart[i].products[productIndex].total=cart[i].products[productIndex].product_info.product_price*cart[i].products[productIndex].quantity;
            
            var total_price=0;
            for (var j=0; j<cart[i].products.length; j++){
                total_price+=cart[i].products[j].total
            }
            
            cart[i].sub_total=total_price;
            if (cart[i].coupon){
                cart[i].total_price=(total_price)-((total_price)*cart[i].coupon.discount);
            }
            else{
                cart[i].total_price=total_price
            }
            cart[i].save();
        }

        req.flash('message', 'Product Edited!');
        return res.redirect('/admin/products')
    })
}

module.exports.new_tag=async(req, res, next)=>{
    if (req.user.admin){
        return res.render('admin/new_tag', {layout: 'adminLayout'})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.add_tag=async(req, res, next)=>{
    const {tag}=req.body;
    if (!tag){
        req.flash('error', 'Missing information!');
        return res.redirect('/admin/tag/new')
    }
    const new_tag=new Tags({
        tag: tag
    });

    new_tag.save();

    req.flash('message', 'Tag added!');
    return res.redirect('/admin/products')
}

module.exports.edit_tag=async(req, res, next)=>{
    if (req.user.admin){
        const tag=req.params.tag;
        const tags=await Tags.findOne({tag: tag});

        return res.render('admin/edit_tag', {layout: 'adminLayout', user: req.user, tag: tags.tag})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.tag_edit=async(req, res, next)=>{
    const tag_found=req.params.tag;
    const {tag}=req.body;
    const updated_tag=await Tags.findOne({tag: tag_found});
    if (tag){
        updated_tag.tag=tag;
    }

    updated_tag.save();

    const products=await Product.find({tags: tag_found});
    for (var i=0; i<products.length; i++){
        for (var j=0; j<products[i].tags.length; j++){
            if (products[i].tags[j]==tag_found && tag){
                products[i].tags[j]=tag;
                break;
            }
        }

        products[i].save();
    }

    req.flash('message', 'Tag Edited!');
    return res.redirect('/admin/products')
}

module.exports.new_company=async(req, res, next)=>{
    if (req.user.admin){
        return res.render('admin/new_company', {layout: 'adminLayout'})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.add_company=async(req, res, next)=>{
    const {company, company_slug}=req.body;
    if (!company || !company_slug){
        req.flash('error', 'Missing information!');
        return res.redirect('/admin/company/new')
    }
    const new_company=new Company({
        company: company,
        company_slug: company_slug
    });

    new_company.save();

    req.flash('message', 'Company added!');
    return res.redirect('/admin/products')
}

module.exports.edit_company=async(req, res, next)=>{
    if (req.user.admin){
        const company_slug=req.params.company_slug;
        const company=await Company.findOne({company_slug: company_slug});

        return res.render('admin/edit_company', {layout: 'adminLayout', user: req.user, company: company.company, company_slug: company_slug});
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.company_edit=async(req, res, next)=>{
    const company_found=req.params.company_slug;
    const {company, company_slug}=req.body;
    const updated_company=await Company.findOne({company_slug: company_found});
    if (company){
        updated_company.company=company;
    }
    if (company_slug){
        updated_company.company_slug=company_slug;
    }

    updated_company.save();

    req.flash('message', 'Company Edited!');
    return res.redirect('/admin/products')
}

module.exports.edit_coupon=async(req, res, next)=>{
    if (req.user.admin){
        const coupon_code=req.params.coupon_code;
        const coupon=await Coupon.findOne({coupon_code: coupon_code});

        return res.render('admin/edit_coupon', {layout: 'adminLayout', user: req.user, coupon_code: coupon.coupon_code, discount: coupon.discount});
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.coupon_edit=async(req, res, next)=>{
    const code=req.params.coupon_code;
    const {coupon_code, discount}=req.body;
    const updated_coupon=await Coupon.findOne({coupon_code: code});
    if (coupon_code){
        updated_coupon.coupon_code=coupon_code;
    }
    if (discount){
        const get_discount=parseFloat(discount);
        updated_coupon.discount=get_discount;

        const cart=await Cart.find({coupon: updated_coupon._id})
        for (var i=0; i<cart.length; i++){
            cart[i].total_price=cart[i].sub_total-cart[i].sub_total*get_discount;
            cart[i].save();
        }
    }

    updated_coupon.save();

    req.flash('message', 'Coupon Edited!');
    return res.redirect('/admin/products')
}


module.exports.new_coupon=async(req, res, next)=>{
    if (req.user.admin){
        return res.render('admin/new_coupon', {layout: 'adminLayout'})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.add_coupon=async(req, res, next)=>{
    const {coupon_code, discount}=req.body;
    if (!coupon_code || !discount){
        req.flash('error', 'Missing information!');
        return res.redirect('/admin/coupon/new')
    }

    const get_discount=parseFloat(discount)
    const new_coupon=new Coupon({
        coupon_code: coupon_code,
        discount: get_discount
    });

    new_coupon.save();

    req.flash('message', 'Coupon added!');
    return res.redirect('/admin/products')
}

module.exports.delete=async(req, res, next)=>{
    const {delete_product, delete_tag, delete_company, delete_coupon}=req.body;
    if (delete_product){
        const id=delete_product;
        const cart=await Cart.find({"products.product_info":new ObjectId(id)}).populate('coupon');

        for (var i=0; i<cart.length; i++){
            var total_price=cart[i].sub_total;
            for (var j=0; j<cart[i].products.length; j++){
                if (cart[i].products[j].product_info.equals(new ObjectId(id))){
                    total_price=total_price-cart[i].products[j].total;
                    break;
                }
            }
            cart[i].sub_total=total_price
            cart[i].products.pull({product_info: new ObjectId(id)});
            if (cart[i].coupon){
                cart[i].total_price=(total_price)-((total_price)*cart[i].coupon.discount);
            }
            else{
                cart[i].total_price=total_price
            }
            cart[i].save();
        }

        const deleteProduct=await Product.findOneAndDelete({_id: new ObjectId(id)});
        req.flash('message', 'Product Deleted!');
        return res.redirect('/admin/products')
    }

    else if(delete_tag){
        const tag=delete_tag;
        const products=await Product.updateMany({tags: tag}, {$pull: {tags: tag}})

        const deleteTag=await Tags.findOneAndDelete({tag: tag});
        req.flash('message', 'Tag Deleted!');
        return res.redirect('/admin/products')
    }

    else if(delete_company){
        const company_id=delete_company;
        const products=await Product.updateMany({company: company_id}, {company: undefined})

        const deleteTag=await Company.findOneAndDelete({_id: company_id});
        req.flash('message', 'Company Deleted!');
        return res.redirect('/admin/products');
    }

    else if(delete_coupon){
        const coupon_id=delete_coupon;

        const cart=await Cart.find({coupon: new ObjectId(coupon_id)});

        for (var i=0; i<cart.length; i++){
            cart[i].coupon=undefined;
            cart[i].total_price=cart[i].sub_total;
            cart[i].save();
        }

        const deleted=await Coupon.findOneAndDelete({_id: coupon_id});
        req.flash('message', 'Coupon Deleted!');
        return res.redirect('/admin/products');
    }
}