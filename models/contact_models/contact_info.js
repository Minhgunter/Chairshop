const mongoose=require('mongoose');
const schema=mongoose.Schema;

const contact_info=new schema(
    {
        address: String,
        email: String,
        phone: String
    }, {collection: 'contact_info'}
)

const model=mongoose.model('contact_info', contact_info);
module.exports=model;