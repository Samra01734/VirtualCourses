import multer from "multer";

// ✅ storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");   // folder hona chahiye
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ✅ multer setup
const upload = multer({ storage });

export default upload;