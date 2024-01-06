const Services=require('../../models/services_model')
const Member=require('../../models/member_model')
const upload=require('../../config/multer');

module.exports.admin_about=async(req, res, next)=>{
    if (req.user.admin){
        const service=await Services.find({});
        const member=await Member.find({});
        return res.render('admin/about_us', {layout: 'adminLayout', user: req.user, services: service, member: member})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.new_service=async(req, res, next)=>{
    if (req.user.admin){
        return res.render('admin/new_service', {layout: 'adminLayout', user: req.user})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.add_service=async(req, res, next)=>{
    upload(req, res, async (err)=>{
        if (err){
            req.flash('error', 'Cannot upload images!');
            return res.redirect('/admin/service/new')
        }

        if (!req.file){
            req.flash('error', 'Image not selected!');
            return res.redirect('/admin/service/new');
        }

        const {benefit, description}=req.body;
        if (!benefit || !description){
            req.flash("error", "Missing information!");
            return res.redirect('/admin/service/new');
        }
        const icon=req.file.filename;

        const service=new Services({
            icon: icon,
            benefit: benefit, 
            description: description
        })

        service.save();
        req.flash("message", "Service added!");
        return res.redirect('/admin/about_us');
    }
)}

module.exports.edit_service=async(req, res, next)=>{
    if (req.user.admin){
        const id=req.params.id;

        const service=await Services.findById(id);

        return res.render('admin/edit_service', {layout: 'adminLayout', user: req.user, benefit: service.benefit, description: service.description})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.service_edit=async(req, res, next)=>{
    upload(req, res, async (err)=>{
        const id=req.params.id;
        const {benefit, description}=req.body;
        const service=await Services.findById(id);
        if (benefit){
            service.benefit=benefit;
        }

        if (description){
            service.description;
        }

        if (req.file){
            service.icon=req.file.filename;
        }

        service.save();
        req.flash("message", "Service edited!");
        return res.redirect('/admin/about_us');
    })
}

module.exports.new_member=async(req, res, next)=>{
    if (req.user.admin){
        return res.render('admin/new_member', {layout: 'adminLayout', user: req.user})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.add_member=async(req, res, next)=>{
    upload(req, res, async (err)=>{
        if (err){
            req.flash('error', 'Cannot upload images!');
            return res.redirect('/admin/member/new')
        }

        if (!req.file){
            req.flash('error', 'Image not selected!');
            return res.redirect('/admin/member/new');
        }

        const {name, position, information}=req.body;
        if (!name || !position || !information){
            req.flash("error", "Missing information!");
            return res.redirect('/admin/member/new');
        }
        const image=req.file.filename;

        const member=new Member({
            image: image,
            name: name,
            position: position, 
            information: information
        })

        member.save();
        req.flash("message", "Member added!");
        return res.redirect('/admin/about_us');
    }
)}

module.exports.edit_member=async(req, res, next)=>{
    if (req.user.admin){
        const id=req.params.id;

        const member=await Member.findById(id);

        return res.render('admin/edit_member', {layout: 'adminLayout', user: req.user, name: member.name, position: member.position, information: member.information})
    }

    else{
        return res.render('admin/restricted')
    }
}

module.exports.member_edit=async(req, res, next)=>{
    upload(req, res, async (err)=>{
        const id=req.params.id;
        const {name, position, information}=req.body;
        const member=await Member.findById(id);
        if (name){
            member.name=name;
        }

        if (position){
            member.position=position;
        }

        if (information){
            member.information=information;
        }

        if (req.file){
            member.image=req.file.filename;
        }

        member.save();
        req.flash("message", "Member edited!");
        return res.redirect('/admin/about_us');
    })
}