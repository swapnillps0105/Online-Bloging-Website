const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const baseDir = `E:/Download folder/Swapnil-Blog-Project-1/Swapnil-Blog-Project/api`;
// const baseDir = `/home/suryansh/Desktop/api/`; 


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, baseDir + "/resources/static/assets/images/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
