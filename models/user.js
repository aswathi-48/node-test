import mongoose from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = new mongoose.Schema({

    user_name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
       
    },
    password: {
        type:String,
        required:true,
    },
    role: {
        type:String,
        default:'Client',
    },
},{ timestamps:true })

UserSchema . plugin(uniqueValidator);


const UserData = mongoose.model("userData", UserSchema)

export default UserData;