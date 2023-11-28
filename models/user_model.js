const mongoose=require('mongoose');
const schema=mongoose.Schema;

const user=new schema(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    dateofcreation: {type: Date, default: Date.now},
    email: {type: String, required: true, unique: true},
    full_name: {type: String, default: ''},
    address: {type: String, default: ''},
    contact: {type: String, default: ''},
    phone: {type: String, default: ''},
    dateofbirth: {type: String, default: ''},
    gender: {type: String, default: 'Male'}
  }, {collection: 'user'})

const model=mongoose.model('user', user);
module.exports=model;