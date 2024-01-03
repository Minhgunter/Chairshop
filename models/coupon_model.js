const mongoose=require('mongoose');
const schema=mongoose.Schema;

const coupon=new schema(
    {
        coupon_code: {type: String, required: true},
        discount: {type: Number, required: true}
    }, {collection: 'coupon'}
)

const model=mongoose.model('coupon', coupon);
module.exports=model;