const multer = require("multer"),
      path = require("path");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        let folder = path.resolve(__dirname, "../../public/images/productos-assets")
        cb(null,folder)
    },
    filename: (req,file,cb) => {
        let imageName = Date.now() + "-" + file.originalname
        cb(null,imageName)
    }
})

const uploadProducts = multer({storage})

module.exports = uploadProducts