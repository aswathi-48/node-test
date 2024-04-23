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
], login)

router.post('/register', 
[
    check('first_name').not().isEmpty(),
    check('last_name').not().isEmpty(),
    check('gender').not().isEmpty(),
    check('email').not().isEmpty(),
    check('password').isLength({ min: 5 }),
    check('date_of_birth').not().isEmpty(),
    check('phone_number').isLength({ max: 10 }),

],register)

router.use(authCheck)

router.post('/test_auth_check', authConfirmTest)


export default router