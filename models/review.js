import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    
    user: {
        ref : "userData",
        type: mongoose.Schema.Types.ObjectId,
        require:true,
    },
    book: {
        ref : "books",
        type: mongoose.Schema.Types.ObjectId,
        require:true,
    },
    review: {
        type:String,
        require:true,
    },

    rating: {
        type:Number,
        require:true,
    },
    isdeleted: {
        type:Boolean,
        default:false
    }

}, { timestamps : true })

const Review = mongoose.model("review", ReviewSchema);

export default Review;