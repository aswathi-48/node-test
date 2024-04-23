import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    
    name: {
        type:String,
        required:true,
    },
    author: {
        type:String,
        required:true,
    },
    genre: {
        type:String,
        required:true,
    },
    star_rating: {
        type:Number,
        required:true,
    },
    published: {
        type:Date,
        required:true,
    },
    price: {
        type:Number,
        required:true,
    },
    language: {
        type:String,
        required:true,
    },
    image: {
        type:String,
        required:false,
        default:null,
    },
    isdeleted: {
        type:Boolean,
        default:false
    }

},{ timestamps : true })

const Book = mongoose.model("books", BookSchema);

export default Book;