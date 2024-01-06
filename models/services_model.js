const mongoose=require('mongoose');
const schema=mongoose.Schema;

const services=new schema(
    {
        icon: String,
        benefit: String,
        description: String
    }, {collection: 'services'}
)

const model=mongoose.model('services', services);
module.exports=model;