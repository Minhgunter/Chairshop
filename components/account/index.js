const express = require('express');
const router = express.Router();
const re=require('../../controller/userController')
const {ensureAuthenticated}=require('../../config/auth')

/* GET home page. */

router.get('/', ensureAuthenticated, re.redirect_profile)

router.get('/:username', ensureAuthenticated, re.index_profile);
router.get('/:username/edit', ensureAuthenticated, re.index_edit);
router.post('/:username/edit', ensureAuthenticated, re.edit_profile);

module.exports = router;
