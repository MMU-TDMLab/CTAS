const multer = require('multer');

// const mimeTypeMap = multer({
//   fileFilter: function (req, file, cb) {

//     var filetypes = /txt|text/;
//     var mimetype = filetypes.test(file.mimetype);
//     var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb("Error: File upload only supports the following filetypes - " + filetypes);
//   }
// });

const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
    // const isValid = mimeTypeMap[file.mimetype];
    // let error = new Error('Invalid mime type');
    // if (!isValid) {
    //   error = null;
    // }
    // cb(null, 'backend/documents');
  // },
  // filename: (req, file, cb) => {
  //   const name = file.originalname.toLowerCase().split(' ').join('-');
  //   const nameWithoutExtension = name.replace(/\.[^/.]+$/, "");
  //   const fileExtention = file.originalname.split('.').pop();
  //   const fileName = nameWithoutExtension;
  //   cb(null, fileName + '-' + Date.now() + '.' + fileExtention);
  // }
});

module.exports = multer({ storage: storage }).single('file');
