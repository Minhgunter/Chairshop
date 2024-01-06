const mongoose=require('mongoose');
const schema=mongoose.Schema;

const member=new schema(
    {
        image: String,
        name: String,
        position: String,
        information: String
    }, {collection: 'member'}
)

const model=mongoose.model('member', member);
module.exports=model;