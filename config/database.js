const mongoose=require('mongoose');

const db=mongoose.connect('mongodb://0.0.0.0:27017/website', {
  useNewUrlParser: true,
});

module.exports=db;