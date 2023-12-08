const { ObjectId } = require('mongodb');
const mongoose=require('mongoose');
const schema=mongoose.Schema;

const product=new schema(
    {
        product_name: {type: String, required: true},
        product_price: {type: Number, required: true},
        description: {type: String, required: true},
        status: {type: String},
        tags: [{type: schema.Types.ObjectId, ref: 'tags'}],
        image: {type: String, required: true},
        updateat: {type: Date, default: Date.now},
        slug: String
    }, {collection: 'products'}
)

const model=mongoose.model('products', product);
module.exports=model;