const multer=require('multer');
const path=require('path');


const storage = multer.diskStorage({
    destination: './public/images/', 
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 4*1024*1024 },
    fileFilter: function(req, file, cb) {
      // Allowed file types
      const filetypes = /jpeg|jpg|png|svg/;
      // Check the file extension
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      // Check MIME type
      const mimetype = filetypes.test(file.mimetype);
  
      if (mimetype && extname) {
        // File type is allowed
        cb(null, true);
      } else {
        // Reject file
        cb(new Error('Error: Images only!'));
      }
    }
  }).single('image');

  module.exports=upload;