import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: [true, 'Please, insert a valid username'],
        minlength: [5, 'The name must have more than 5 characters'],
        maxlength: [40, 'The name must have less than 40 characters'],
    },
    email : {
        type: String,
        required : [true, 'Must have a valid e-mail'],
        unique : true,
        lowercase : true,
        validate : [validator.isEmail, 'Please enter a valid e-mail']
    },
    role: {
        type: String,
        enum: ['user', 'owner', 'admin'],
        default: 'user'
    },
}, { timestamps : true})

const User = mongoose.model('Users', userSchema)

export default User