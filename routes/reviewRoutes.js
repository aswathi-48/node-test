import { Router } from "express";
import { addReview, viewReview } from "../controllers/reviewController.js";
import authCheck from "../middlewares/authCheck.js";
import { check } from "express-validator";

const router = Router()

router.post('/view/review', viewReview)
router.use(authCheck)

router.post('/add/review',
[
    check('review').not().isEmpty()
],addReview)



export default router