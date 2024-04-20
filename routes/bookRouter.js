import  { Router } from "express"
import { addBook, booklist, deleteBook, editBook } from "../controllers/bookController.js"
import authCheck from "../middlewares/authCheck.js"
// import { upload } from "../middlewares/multer/multer.js"
import { books } from "../models/Book.js"
// import multer from "multer"
// import { upload } from "../middlewares/multer/multer.js"
import {upload} from '../middlewares/multer/multer.js'


const router = Router()

router.use(authCheck)

router.post('/list/book',booklist)

router.post('/add/book',upload.single("file"),addBook)

router.patch('/edit/book/',upload.single("file"),editBook)

router.patch('/delete/book',deleteBook)
  

export default router

