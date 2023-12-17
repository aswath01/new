import multer from "multer";

const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
}).single("file");

const uploadSingleFile = (req, res, next) => {
  fileUpload(req, res, async (err) => {
    console.log({ err });
    next();
  });
};

export { uploadSingleFile };
