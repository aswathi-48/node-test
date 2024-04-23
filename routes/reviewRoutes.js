import { Router } from "express";
import { addReview } from "../controllers/reviewController.js";
import authCheck from "../middlewares/authCheck.js";
import { check } from "express-validator";

const router = Router()

router.use(authCheck)

router.post('/addreview',
[
    check('review').not().isEmpty()
],addReview)

export default router