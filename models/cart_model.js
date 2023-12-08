const { ObjectId } = require('mongodb');
const mongoose=require('mongoose');
const schema=mongoose.Schema;

const cart=new schema(
    {
        customer: {type: schema.Types.ObjectId, ref: "user"},
        products: [{product_info: {type: schema.Types.ObjectId, ref: "products"}, quantity: Number, ordered: {type: Date, default: Date.now}}],
        discount: Number,
        total_price: Number
    }, {collection: 'cart'}
)

const model=mongoose.model('cart', cart);
module.exports=model;