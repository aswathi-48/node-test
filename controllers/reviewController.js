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
            .populate({
                path: 'user',
                select: "user_name last_name _id"
            })
            .populate({
                path: 'book',
                select: "name author"
            })

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

// view review

export const viewUserReview = async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(new HttpError("Something went wrong...", 422))
        } else {
            const { id } = req.body

            console.log(id, "id")

            const review = await Review.find({ book: id })
                .populate({
                    path: 'user',
                    select: " first_name user_name last_name _id"
                })
                .populate({
                    path: 'book',
                    select: "name"
                })

            res.status(200).json({
                status: true,
                message: '',
                data: review,
                access_token: null
            })
        }

    } catch (err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}

//edit Book

export const editReview = async (req, res, next) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {  
            console.log("error")
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422))
        } else {
            const { userId } = req.userData
            console.log( req.userData);
            const reviewId = req.body;      
            const {_id,  user, review, rating } = req.body 
            console.log(user);
         
            console.log(req.body);
            if (userId === user ) {
                console.log("user");
                const reviewData = await Review.findOne({   _id })
                
                const updateReview = await Review.findOneAndUpdate({_id}, { user, review, rating }, { new: true })
                console.log(updateReview);
                res.status(200).json({
                    status: true,
                    message: '',
                    data: updateReview,
                    access_token: null
                })
            } 
            else {
                res.status(200).json({
                    status: true,
                    message: 'error',
                    data: null,
                    access_token: null
                })
            }
        }
    }
    catch (err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}


export const deleteReview = async(req, res, next) => {

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            return next(new HttpError("Something went wrong.."), 422)

        } else {

            const { role } = req.userData

            if ( role !== 'admin' ) {

                return next(new HttpError("Oops! Process failed, admin can only delete book", 400))

            } else {

                const { bookId } = req.body      
                console.log(req.body);

                const deleteReview = await Review.findByIdAndUpdate(bookId, { isdeleted:true })

                res.status(200).json({
                    status : true,
                    message : "",
                    data : deleteReview
                })
            }
        }

    } catch(err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}


