import multer from "multer";

const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
}).array("files", 12);

const uploadMultipleFiles = (req, res, next) => {
  fileUpload(req, res, async (err) => {
    next();
  });
};

export { uploadMultipleFiles };
