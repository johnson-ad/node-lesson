const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    username : {
        type : String,
        required : [true, "Please add the username"]
    },
    email : {
        type : String,
        required : [true, "Please add the user email "]
    },
    password : {
        type : String,
        required : [true, "Please add the user password "]
    }

},{timestamps:true})

module.exports = mongoose.model("User", userSchema)