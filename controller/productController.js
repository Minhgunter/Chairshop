const mongoose = require('mongoose');
const Product=require('../models/product_model');
const Tag=require('../models/tag_model');

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
        const results=await Product.find({}, {});
        
        return res.render('shop/index', {products: results, tags: tags});
    }
    catch(error){
        console.log(error);
    }
};

module.exports.catalog=async(req, res, next)=> 
{
    const selected=req.params.tag;
    try{
        const find_tag=await Tag.findOne({tag: selected}, '_id').exec();
        const tagged=find_tag._id;
        const tags=await Tag.find({}, {});
        const results=await Product.find({tags: {$in: [tagged]}});
        return res.render('shop/index', {products: results, tags: tags});
    }
    catch(error){
        console.log(error);
    }
};

module.exports.details=async(req, res, next)=>
{
    const slug=req.params.slug;
    try{
        const found=await Product.findOne({slug: slug}).populate('tags');
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