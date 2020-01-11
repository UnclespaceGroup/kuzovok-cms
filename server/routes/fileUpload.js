
// const CheckAuthorize = require('../services/checkAuthorize')
const multer  = require("multer");

const fileUpload = function (app, passport, rootDirectory) {
  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, `${rootDirectory}/uploads/`);
    },
    filename: (req, file, cb) =>{
      cb(null, file.originalname);
    }
  });
  app.use(multer({storage:storageConfig}).single("filedata"));
  app.post("/upload", function (req, res, next) {

    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
      res.send("Ошибка при загрузке файла");
    else
      res.send("Файл загружен");
  });
}
module.exports = fileUpload
