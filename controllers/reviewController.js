import { validationResult } from "express-validator"
import HttpError from "../middlewares/httpError.js"
import Review from '../models/review.js'

//add reviews
export const addReview = async(req, res, next) => {

    try{

        const errors = validationResult(req);

        if (! errors.isEmpty()) {
            
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));

        } else {
            const { userId } = req.userData  
            const { review, rating, book_id } = req.body 
            const newReview = new Review({ user : userId, book : book_id, review, rating })
            const saveReview = await newReview.save()
            
            res.status(200).json({
                status : true,
                message : "",
                data : saveReview
            })
        }

    } catch(err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}