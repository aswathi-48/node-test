import { validationResult } from "express-validator";
import HttpError from "../middlewares/httpError.js";
import UserData from "../models/user.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// new user registeration
export const register = async (req, res, next) => {
  
  try {

    const errors = validationResult(req);
    const { user_name, email, password ,role } = req.body 

    if (! errors.isEmpty()) {
      return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
    } else {

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      const newuser =  new UserData({ user_name, email, password: hash, role })
      const savedUser = await newuser.save()

      res.status(200).json({
        status: true,
        message: "",
        data: savedUser
      })
    }

  } catch(err) {
    return next(new HttpError("Oops! Process failed, please do contact admin", 500));
  }
}

//login
export const login = async (req, res, next) => {

  try{
    const errors = validationResult(req);

    const { email , password } = req.body

    if (!errors.isEmpty()) {

      return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));

    } else {
      const user = await UserData.findOne({ email: email });
  
    if (!user) {

      return next(new HttpError("Invalid credentials", 400))
    } else {

      const isPassword = await bcrypt.compare( req.body.password, user.password );
    if (isPassword) {
        const token = jwt.sign({ userId: user._id, userEmail: user. email, role: user.role },
                      process.env.JWT_SECRET,
                      { expiresIn: process. env. JWT_TOKEN_EXPIRY });

        res.status(200).json({
          status: true,
          message: '',
          access_token: token
        
        })
    }
    else {

        res.status(404).json({
          status: true,
          message: "Oops! invalid credential!",
          data:null
        })   
    }
     }
    }
  } catch(err) {
    console.error(err)
    return next(new HttpError("Oops! Process failed", 500));
  }
}

//confirm authorization
export const authConfirmTest = async (req, res, next) => {

    try {
      const errors = validationResult(req);
      if (! errors.isEmpty()) {

        return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));

      } else {
        const { userId } = req.userData // this is from authCheck

         res.status(200).json({
                status: true,
                message: 'Successfully authorized',
                data: userId,
                access_token: null
              })
          }
    } catch (err) {
        console.error(err)
      return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
};