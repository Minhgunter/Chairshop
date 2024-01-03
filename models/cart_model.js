const { ObjectId } = require('mongodb');
const mongoose=require('mongoose');
const schema=mongoose.Schema;

const cart=new schema(
    {
        customer: {type: String},
        products: [{product_info: {type: schema.Types.ObjectId, ref: "products"}, quantity: Number, total: Number, ordered: {type: Date, default: Date.now}}],
        coupon: {type: schema.Types.ObjectId, ref: "coupon"},
        sub_total: {type: Number, default: 0},
        total_price: {type: Number, default: 0}
    }, {collection: 'cart'}
)

const model=mongoose.model('cart', cart);
module.exports=model;