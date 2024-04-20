import mongoose from "mongoose";

const ReviwSchema = new mongoose.Schema({
    
    user: {
        type:String,
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
},{timestamps:true})

const Review = mongoose.model("review",ReviwSchema);

export default Review;