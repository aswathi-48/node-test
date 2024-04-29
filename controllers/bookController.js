import { validationResult } from "express-validator";
import Book from "../models/book.js";
import HttpError from "../middlewares/httpError.js";
import fs from 'fs'

//add new book
export const addBook = async(req, res, next) => {

    try {
        const errors = validationResult(req);
     
        if (! errors.isEmpty()) {

            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!", 422));
          }
         
        else {

            const { role } = req.userData
       
            const { name, author, genre, star_rating, published, price, language } = req.body

            if (role !== 'admin') {

                return next(new HttpError("Oops! Process failed, admin can only add book", 400))

            } else {

                const newBook = new Book({ name, author, genre, star_rating, published, price, language })
                if(req.file && req.file.filename) newBook.image = process.env.BASE_URL + "/books/cover_images/" + req.file.filename;
                // const file = req.file ? process.env.BASE_URL + "/books/cover_images/" + req.file.filename : null
                // const newBook = new Book({ name, author, genre, star_rating, published, price, language, image:file})
                const saveBook = await newBook.save()
    
                if (! newBook) {
                    return next(new HttpError("Oops! Process failed, please do contact admin", 400))
    
                } else {
                    res.status(200).json({
                        status: true,
                        message: "",
                        data: saveBook
                    })
                }
            }
        }       
    } catch(err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}

// list all books
export const bookList = async(req, res, next) => {
    
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            return next(new HttpError("Something went wrong...", 422))

        } else {

            let query = {}

            if ( req.query.keyword ) {   //for search

                query.$or = [

                    { "name": { $regex: req.query.keyword, $options : 'i' }},
                    { "author": { $regex: req.query.keyword, $options : 'i' }}

                ]
            }
            
            const listBook = await Book.find({ isdeleted : false, ...query }) 

            res.status(200).json({
                status : true,
                message : 'Successfully authorized',
                data : listBook,
                access_token : null
            })
        }
    } catch (err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}

//edit books
export const editBook = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty()) { 

            return next(new HttpError("Something went wrong..", 422))

        } else {

            const { name, author, genre, star_rating, published, price, language, bookId } = req.body

            const { role } = req.userData

            if (role !== 'admin') {

                return next(new HttpError("Oops! Process failed, admin can only edit book", 400))

            } else {
                           
            const bookData = await Book.findOne({ _id:bookId })

            const image = req.file ? process.env.BASE_URL + "/books/cover_images/" + req.file.filename : bookData.image

            if (req.file && bookData.image !== null) {
                
                const prevImgPath = bookData.image.slice(22)
                fs.unlink(`./upload/${ prevImgPath }`, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }
            const edit = await Book.findOneAndUpdate({ _id : bookId }, { name, author, genre, star_rating, published, price, language, image }, { new: true })

            res.status(200).json({
                status : true,
                message : "",
                data : edit
            })
            }

        }

    } catch(err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}

//delete book
export const deleteBook = async(req, res, next) => {

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

                const deleteBook = await Book.findByIdAndUpdate(bookId, { isdeleted:true })

                res.status(200).json({
                    status : true,
                    message : "",
                    data : deleteBook
                })
            }
        }

    } catch(err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}

export const viewBook = async(req, res, next) => {
    
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            return next(new HttpError("Something went wrong...", 422))

        } else {

            const { bookId } =req.body
            const bookView = await Book.findOne({ _id: bookId }) 

            res.status(200).json({
                status : true,
                message : 'Successfully authorized',
                data : bookView,
                access_token : null
            })
        }
    } catch (err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}
