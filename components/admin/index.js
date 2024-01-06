const express = require('express');
const router = express.Router();
const home=require('../../controller/adminControllers/adminHome')
const products=require('../../controller/adminControllers/adminProducts')
const user=require('../../controller/adminControllers/adminUser')
const about=require('../../controller/adminControllers/adminAbout')
const {ensureAuthenticated}=require('../../config/auth')

/* GET home page. */
router.get('/', ensureAuthenticated, home.admin_home);

/*Admin Product*/
router.get('/products', ensureAuthenticated, products.admin_products);
router.get('/products/new', ensureAuthenticated, products.new_product);
router.post('/products/new', ensureAuthenticated, products.add_product)
router.get('/products/:slug/edit', ensureAuthenticated, products.edit_product)
router.post('/products/:slug/edit', ensureAuthenticated, products.edit)
router.get('/tag/new', ensureAuthenticated, products.new_tag);
router.post('/tag/new', ensureAuthenticated, products.add_tag);
router.get('/tag/:tag/edit', ensureAuthenticated, products.edit_tag);
router.post('/tag/:tag/edit', ensureAuthenticated, products.tag_edit);
router.get('/company/new', ensureAuthenticated, products.new_company);
router.post('/company/new', ensureAuthenticated, products.add_company);
router.get('/company/:company_slug/edit', ensureAuthenticated, products.edit_company);
router.post('/company/:company_slug/edit', ensureAuthenticated, products.company_edit);
router.get('/coupon/new', ensureAuthenticated, products.new_coupon);
router.post('/coupon/new', ensureAuthenticated, products.add_coupon);
router.get('/coupon/:coupon_code/edit', ensureAuthenticated, products.edit_coupon);
router.post('/coupon/:coupon_code/edit', ensureAuthenticated, products.coupon_edit);
router.post('/products', ensureAuthenticated, products.delete);

/*Admin User */

router.get('/users', ensureAuthenticated, user.admin_users);
router.get('/users/:username/bill', ensureAuthenticated, user.bill)
router.post('/users', ensureAuthenticated, user.delete);

router.get('/about_us', ensureAuthenticated, about.admin_about);
router.get('/service/new', ensureAuthenticated, about.new_service);
router.post('/service/new', ensureAuthenticated, about.add_service);
router.get('/service/:id/edit', ensureAuthenticated, about.edit_service);
router.post('/service/:id/edit', ensureAuthenticated, about.service_edit);
router.get('/member/new', ensureAuthenticated, about.new_member);
router.post('/member/new', ensureAuthenticated, about.add_member);
router.get('/member/:id/edit', ensureAuthenticated, about.edit_member);
router.post('/member/:id/edit', ensureAuthenticated, about.member_edit);

module.exports = router;
