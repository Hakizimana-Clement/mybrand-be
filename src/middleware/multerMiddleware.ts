import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, callback) => {
    let ext = path.extname(file.originalname);

    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".gif" &&
      ext !== ".webp" &&
      ext !== ".bmp" &&
      ext !== ".svg" &&
      ext !== ".tiff" &&
      ext !== ".jfif" &&
      ext !== ".tif"
    ) {
      return callback(null, false);
    }
    callback(null, true);
  },
});

export default upload;

// const upload = multer({ storage: storage });
// import multer from "multer";

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;
