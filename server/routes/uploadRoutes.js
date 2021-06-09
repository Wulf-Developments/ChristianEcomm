import path from "path";
import express from "express";
import multer from "multer";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "Images/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;

  //Gets the extension from the file, will return True/False
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  //Every image has a file type, check the file to see if it equals one of the approved
  //filetypes
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const errorHandler = (err, req, res, next) => {
  //error handler gets called only when catches error
  if (err instanceof multer.MulterError) {
    res.status(400);
  }
  next(err); //redirect to custom error handler
};

//Endpoint
//Uploads a single image.
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  errorHandler,
  (req, res) => {
    if (!req.file) {
      res.status(400);
      throw new Error("Please select file"); //catch by custom error handler
      //next(new Error('Please select file')) //mandatory if inside async function otherwise use express-async-handler which will also redirect implicit errors to custom error handler
    }

    res.send(`/${req.file.path.replace("\\", "/")}`); //replace '\' with '/' because windows supoorts '\' as directory separator
  }
);
export default router;
