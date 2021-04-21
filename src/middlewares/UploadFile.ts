const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
import crypto from 'crypto'
import { extname } from 'path'
import slug from 'slug'
import fs from 'fs'

let storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const path = `./public/static/assets/uploads/avatar/`
    cb(null, path);
  },
  filename: (req: any, file: any, cb: any) => {
    const id = req.body.user 
    const extName = extname(file.originalname)
    const fileName = id + extName
      crypto.randomBytes(3, (err, res) => {
        if (err) return cb(err)
        
        return cb(null, fileName)
      })
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;