import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
// // mutterMiddleware.js

// // const multer = require("multer");
// import multer from "multer";

// // Set up storage options (where to temporarily store uploaded files)
// const storage = multer.diskStorage({
//   destination: "uploads/", // Specify the directory where files will be saved
//   filename: (req, file, cb) => {
//     // Customize the filename (you can use a unique identifier here)
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// // Create the Multer instance
// const upload = multer({ storage });
// export default upload;
