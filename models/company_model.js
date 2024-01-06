const mongoose=require('mongoose');
const schema=mongoose.Schema;

const company=new schema(
  {
    company: String,
    company_slug: String
  }, {collection: 'company'})

const model=mongoose.model('company', company);
module.exports=model;