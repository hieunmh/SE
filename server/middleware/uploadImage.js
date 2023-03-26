const path = require('path');
const multer = require('multer');

//Handling multipart/form-data for file uploading
const storage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'public', 'upload', folder));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
};

function upload(folder) {
  return multer({ storage: storage(folder) });
}

module.exports = upload;
