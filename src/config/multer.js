const multer = require('multer');

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),

  fileFilter: (req, file, cb) => {
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (acceptedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
