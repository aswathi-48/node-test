import  { Router } from "express"
import { addBook, bookList, deleteBook, editBook, viewBook} from "../controllers/bookController.js"
import authCheck from "../middlewares/authCheck.js"
import {upload} from '../middlewares/multer/fileUpload.js'
import { check } from "express-validator"

const router = Router()


router.post('/list/book', bookList)
router.post('/view',viewBook)
router.use(authCheck)

router.post('/add/book',upload.single("image"),
[
    check('name').not().isEmpty(),
    check('author').not().isEmpty(),
    check('genre').not().isEmpty(),
    check('star_rating').not().isEmpty(),
    check('published').not().isEmpty(),
    check('price').not().isEmpty(),
    check('language').not().isEmpty()

], addBook)

router.patch('/edit/book/',upload.single("image"), editBook)

router.patch('/delete/book',deleteBook)


export default router

