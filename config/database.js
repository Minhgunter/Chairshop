const mongoose=require('mongoose');

const db=mongoose.connect('mongodb+srv://quocthai290103:thaidangquoc2901@cluster0.wgvprle.mongodb.net/', {
  useNewUrlParser: true,
});

module.exports=db;