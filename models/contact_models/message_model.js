const mongoose=require('mongoose');
const schema=mongoose.Schema;

const message=new schema(
    {
        first_name: String,
        last_name: String,
        email: String,
        message: String
    }, {collection: 'message'}
)

const model=mongoose.model('message', message);
module.exports=model;