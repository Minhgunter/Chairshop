const mongoose = require('mongoose');
const Product=require('../models/product_model');
const Tag=require('../models/tag_model');
const Company=require('../models/company_model')

module.exports.home=async(req, res, next)=> 
{
    try{
        const results=await Product.find({}, {}).limit(3).sort({updateat: -1});
        
        return res.render('home/index', {products: results});
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
        
        return res.render('shop/index', {products: results, tags: tags, company: company});
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

        var tag_list=[];
        const search=req.query.product;
        const tag=req.query.tag;
        const selected_company=req.query.company;
        
        const tag_found=await Tag.find({tag: {$in: tag}}, '_id').exec()
        const company_found=await Company.findOne({company: selected_company}, '_id')
        for (var i in tag_found){
            tag_list.push(tag_found[i]._id)
        }

        if (tag_list.length>0 && company_found!=null){
            const products=await Product.find({product_name: { $regex: search, $options: "i" }, tags: {$all: tag_list}, company: company_found._id})
            
            return res.render('shop/index', {products: products, tags: tags, company: company, tag_found: tag_found, selected_company: selected_company});
        }

        if (company_found==null && tag_list.length>0){
            const products=await Product.find({product_name: { $regex: search, $options: "i" }, tags: {$all: tag_list}});
            return res.render('shop/index', {products: products, tags: tags, company: company, tag_found: tag_found, selected_company: selected_company});
        }

        if (tag_list.length<=0 && company_found!=null){
            const products=await Product.find({product_name: { $regex: search, $options: "i" }, company: company_found._id});
            return res.render('shop/index', {products: products, tags: tags, company: company, tag_found: tag_found, selected_company: selected_company});
        }

        if (tag_list.length<=0 && company_found==null){
            const products=await Product.find({product_name: { $regex: search, $options: "i" }});
            
            return res.render('shop/index', {products: products, tags: tags, company: company, tag_found: tag_found, selected_company: selected_company});
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
        const found=await Product.findOne({slug: slug}).populate('tags');
        if (!found){
            return res.render('shop/detail')
        }
        const product_name=found.product_name;
        const product_price=found.product_price;
        const description=found.description;
        const status=found.status;
        const image=found.image;
        const tags=found.tags;

        return res.render('shop/detail', {product_name: product_name, product_price: product_price, description: description, image: image, status: status, tags: tags, slug: slug});
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

        return res.render('shop/order', {product_name: product_name, product_price: product_price})
    }
    catch(error){
        return console.log(error)
    }
}