import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    
    name: {
        type:String,
        require:true,
    },
    author: {
        type:String,
        require:true,
    },
    genre: {
        type:String,
        require:true,
    },
    star_rating: {
        type:Number,
        require:true,
    },
    published: {
        type:Date,
        require:true,
    },
    price: {
        type:Number,
        require:true,
    },
    language: {
        type:String,
        require:true,
    },
    image: {
        type:String,
        require:true,
    },
    isdeleted:{
        type:Boolean,
        default:false
    }

},{ timestamps:true })

const Book = mongoose.model("books", BookSchema);

export default Book;