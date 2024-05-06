import { Router } from "express";
import { addReview, deleteReview, editReview, viewReview, viewUserReview } from "../controllers/reviewController.js";
import authCheck from "../middlewares/authCheck.js";
import { check } from "express-validator";
import { editBook } from "../controllers/bookController.js";

const router = Router()

router.post('/view/review', viewReview)
router.use(authCheck)

router.post('/add/review',
addReview)

router.post('/user/review',viewUserReview)

router.patch('/edit/review', editReview)

router.patch('delete/review',deleteReview)

export default router