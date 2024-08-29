const multer = require("multer")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/banner');
    },
    filename: (req, file, cb) => {
        // const timestamp = new Date().getTime();
        
        const originalname = file.originalname;

        // const extension = path.extname(file.originalname);

        // cb(null, `${timestamp}-${originalname}`);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + originalname)
    },
    fileFilter: (req, file, cb) => {
    
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype==='image/png') {

            cb(null, 'images')
        } 
        else if (file.mimetype === 'file/pdf') {
            cb(null, 'files')
        } 
        else {
            console.log(file.mimetype)
            cb({ error: 'Mime type not supported' })
        }
  }
});

const uploadBanner = multer({
    storage: storage,
    limits: {
        fileSize: 30 * 1000 * 1000 // 3 MB
    }
    
});


module.exports = uploadBanner;