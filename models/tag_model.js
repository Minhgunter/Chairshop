const mongoose=require('mongoose');
const schema=mongoose.Schema;

const tags=new schema(
    {
        tag: {type: String}
    }, {collection: 'tags'}
)

const model=mongoose.model('tags', tags);
module.exports=model;