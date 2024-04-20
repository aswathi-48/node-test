
import multer from "multer";
// import path, { dirname } from 'node:path'
// import { fileURLToPath } from "node:url";



// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const storage = multer.diskStorage({
//   destination: path.join(__dirname, "uploads"),
//     filename: (req, file, res) => {
//           // file name is prepended with current time
//           // in milliseconds to handle duplicate file names
//         res(null, Date.now() + "-" + file.originalname);
//     },
// });

// const fileFilterConfig = function(req, file, cb) {
//   if (file.mimetype === "image/jpeg"
//       || file.mimetype === "image/png"
//       ||  file.mimetype === "image/jpg") {
//         // calling callback with true
//         // as mimetype of file is image
//       cb(null, true);
//   } else {
//         // false to indicate not to store the file
//       cb(null, false);
//   }
// };


// const upload = multer({ 
//   storage: storage,
//   limits: {
//         // limits file size to 5 MB
//       fileSize: 1024 * 1024 * 10
//   },
//   fileFilter: fileFilterConfig,
// });
// export { upload };

const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'upload/')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload=multer({storage:storage});
export { upload };