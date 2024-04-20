import { validationResult } from "express-validator";
import Book from "../models/bookSchema.js";
import HttpError from "../middlewares/httpError.js";



export const addBook = async(req,res,next) =>{
    try{
        const errors = validationResult(req);
     

        if (! errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
          }
         
          
          else{
        const {name,author,genre,star_rating,published,price,language} =req.body

            if(!name || !author || !req.file || !genre || !star_rating || !published || !price || !language){
                res.status(400).json('invalid')
            }
            const image = req.file.filename;

    
            const newBook = new Book({name,author,genre,star_rating,published,price,language,image})
            const saveBook = await newBook.save()
            res.status(200).json(saveBook)
            console.log(saveBook);
          }
    }catch(err){
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}

export const booklist = async (req,res,next) =>{
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return next(new HttpError("Something went wrong...", 422))
        } else {

            const listBook = await Book.find( {isdeleted:false} ) 

            res.status(200).json({
                status: true,
                message: 'Successfully authorized',
                data: listBook,
                access_token: null
            })
        }
    } catch (err) {
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}


export const editBook = async (req,res,next)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){ 
            return next(new HttpError("Something went wrong..",422))
        }else{

            const {bookId} =req.body

            const {name,author,genre,star_rating,published,price,language} = req.body


            const bookData = await Book.findOne({bookId})
            const image = req.file ? req.file.filename : bookData.image
            // let field = {name,author,genre,star_rating,published,price,language}
            
            // const image = req.file.filename;
            // field.image = image
            const edit = await Book.findOneAndUpdate({_id : bookId},{name,author,genre,star_rating,published,price,language,image},{ new : true })
            // const edit = await Book.findByIdAndUpdate(bookId,{$set:field},{ new : true })

            console.log(edit);
            res.status(200).json("updated..")
        }

    }catch(err){
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}


export const deleteBook = async(req,res,next)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return next(new HttpError("Something went wrong.."),422)
        }else{
            const {bookId} =req.body
           
            const deleteBook = await Book.findByIdAndUpdate(bookId,{isdeleted:true})
            res.status(200).json("deleted")
        }

    }catch(err){
        console.error(err)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500))
    }
}