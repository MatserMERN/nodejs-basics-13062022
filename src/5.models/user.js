const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    }, 
    city: {
       type: String,
       required: true 
    }
}, {versionKey:  false})

const User = mongoose.model("user", userSchema, "user")
module.exports = User

//const User = module.exports = mongoose.model("user", userSchema, "user")
