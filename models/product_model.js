const mongoose=require('mongoose');
const schema=mongoose.Schema;

const product=new schema(
    {
        product_name: {type: String, required: true},
        product_price: {type: Number, required: true},
        description: {type: String, required: true},
        stock: Number,
        tags: [String],
        image: {type: String, required: true},
        updateat: {type: Date, default: Date.now},
        slug: String,
        company: {type: schema.Types.ObjectId, ref: 'company'}
    }, {collection: 'products'}
)

const model=mongoose.model('products', product);
module.exports=model;