const express = require('express');
const router = express.Router();
const ContactInfo=require('../../models/contact_models/contact_info');
const Message=require('../../models/contact_models/message_model');

/* GET home page. */
router.get('/', async(req, res, next)=>{
  const contact_info=await ContactInfo.findOne({});
  if(!contact_info){
    const contact=new ContactInfo({
      address: "",
      email: "",
      phone: "",
    })

    const address=contact.address;
    const email=contact.email;
    const phone=contact.phone;

    contact.save();

    return res.render('contact/index', { address: address,  email: email, phone: phone, user: req.user});
  }

  else{
    const address=contact_info.address;
    const email=contact_info.email;
    const phone=contact_info.phone;

    return res.render('contact/index', { address: address,  email: email, phone: phone, user: req.user});
  }
});

router.post('/', async(req, res, next)=>{
  const {first_name, last_name, email, message}=req.body;
  if(!first_name || !last_name || !email || !message){
    req.flash('error', 'Some information is missing!');
    return res.redirect('/contact')
  }


  const new_message=new Message({
    first_name: first_name,
    last_name: last_name,
    email: email,
    message: message
  });

  new_message.save();
  req.flash('message', 'Message sent!');
  return res.redirect('/contact')
});

module.exports = router;
