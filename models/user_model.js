const mongoose=require('mongoose');
const schema=mongoose.Schema;

const user=new schema(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    dateofcreation: {type: Date, default: Date.now},
    email: {type: String, required: true, unique: true},
    country: String,
    state_couunty: String,
    first_name: String,
    last_name: String,
    address: {type: String, default: ''},
    contact: {type: String, default: ''},
    phone: {type: String, default: ''},
    dateofbirth: {type: String, default: ''},
    gender: {type: String, default: 'Male'}
  }, {collection: 'user'})

const model=mongoose.model('user', user);
module.exports=model;