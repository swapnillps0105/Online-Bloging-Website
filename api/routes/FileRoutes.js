const controller = require("../controller/file.controller");
const express = require("express");
const router = express.Router();

router.post("/upload", controller.upload);
router.get("/files", controller.getListFiles);
router.get("/file/:name", controller.download);
router.delete("/file/:name", controller.remove);
module.exports= router;