const mongoose=require('mongoose');
const schema=mongoose.Schema;

const login=new schema(
  {
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    dateofcreation: {type: Date, default: Date.now}
  }, {collection: 'login'})

const model=mongoose.model('login', login)
module.exports=model