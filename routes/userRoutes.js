import { Router } from "express"
import { check } from "express-validator"
import { authConfirmTest, login } from "../controllers/userController.js"
import authCheck from "../middlewares/authCheck.js"
import { register } from "../controllers/userController.js"

const router = Router()

router.post( '/login',
[
    check('email').not().isEmpty(),
    check('password').not().isEmpty()
],login)

router.post('/register',register)

router.use(authCheck)

router.post('/test_auth_check', authConfirmTest)


export default router