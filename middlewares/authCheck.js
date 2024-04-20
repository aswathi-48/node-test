import jwt from "jsonwebtoken";
// import { User } from "../models/User.js";
import HttpError from "./httpError.js";
import UserData from "../models/userSchema.js";

const authCheck = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    } else {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (! token) {
                return next(new HttpError('Authentication failed!', 403))
            } else {    
         
                const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
                const validUser = await UserData.findOne({ _id : decodedToken.userId })
            
                // const validUser = UserData._id === decodedToken.userId ? UserData : null
                console.log(validUser);
                if (! validUser) {
                    return next(new HttpError("Invalid credentials!",400))
                } else {
          
                    req.userData = { userId : decodedToken.userId }
                    next()
                }
            }
        } catch (error) {
            return next(new HttpError('Authentication failed!', 403))
        }
    }
}
export default authCheck;