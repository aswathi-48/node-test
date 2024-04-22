import { Router } from "express";
import { addReview } from "../controllers/reviewController.js";
import authCheck from "../middlewares/authCheck.js";

const router = Router()

router.use(authCheck)

router.post('/addreview',addReview)

export default router