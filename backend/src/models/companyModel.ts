import mongoose from 'mongoose'
import { cnpj } from 'cpf-cnpj-validator'

const companySchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "A Company must have a name"],
        unique: true,
        trim: true,
        minlength: [3, 'Must be more than 3 letters'],
        maxlength: [40, 'Must be less than 50 letters']
    },
    cnpj: {
        type: String,
        required: [true, 'A company must have a CNPJ'],
        validate: {
            validator : function(val: string) {
            return cnpj.isValid(val)
        }, 
        message : "Must be a valid CNPJ"
        }
    },
    unitys : []
}, { timestamps : true})

const Company = mongoose.model('Companies', companySchema)

export default Company