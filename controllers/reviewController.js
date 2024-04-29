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

// list reviews

export const viewReview = async(req, res, next) =>{

    try {

        const errors = validationResult(req)

        if (! errors.isEmpty()) {
            return next(new HttpError("Something went wrong...", 422))
        } else {
            
            let query = {}

            if ( req.query.keyword ) {

                query.$or = [

                    { "user": { $regex: req.query.keyword, $options : 'i' }},
                    { "book": { $regex: req.query.keyword, $options : 'i' }}

                ]
            } 

            const listReview = await Review.find({ isdeleted : false, ...query }) 

            res.status(200).json({
                status : true,
                message : 'Successfully authorized',
                data : listReview,
                access_token : null
            })
        } 
    } catch (err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}