const mongoose=require('mongoose');
const schema=mongoose.Schema;

const bill=new schema(
    {
        username: String,
        first_name: String,
        last_name: String,
        company: String,
        apartment: String,
        address: String, 
        email: String,
        phone: String,
        postal: String,
        country: String,
        state_county: String,
        products: [{product_info: String, quantity: Number, price: Number}],
        shopping_date: String,
        total_price: {type: Number, default: 0}
    }, {collection: 'bill'}
)

const model=mongoose.model('bill', bill);
module.exports=model;