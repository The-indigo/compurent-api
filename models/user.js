const mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
    },
        email: {
        type: String,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default:false
       } 
})

let options = ({ missingPasswordError: 'Wrong/Missing Password' })
userSchema.plugin(passportLocalMongoose, options)

module.exports=mongoose.model('User', userSchema)