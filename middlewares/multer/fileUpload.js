import multer from "multer";

const storage = multer. diskStorage({
    destination: (req, file, cb) => {
        cb(null,'upload/')
    },
    filename: (req, file, cb) => {
        // let name = file.originalname.replace(/[&\/\\#, +()$~%'":*?<>{}-]/g, '_')
        cb(null, Date. now() + "_" + file.originalname.replace(/[&\/\\#, +()@$~%'":*?<>{}-]/g, '_'))
    }
})

const fileFilterConfig = (req, file, cb) => {
    if (file. mimetype === "image/jpeg" || file. mimetype === "image/png" ||  file. mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilterConfig,
});
export { upload };