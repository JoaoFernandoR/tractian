import mongoose from 'mongoose'

const branchSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "A branch must have a name"],
        unique: true,
        trim: true,
        minlength: [3, 'Must be more than 3 letters'],
        maxlength: [40, 'Must be less than 50 letters']
    },
    country : {
        type: String,
        required: [true, "A branch must have a location"],
        trim: true
    },
    state : {
        type: String,
        required: [true, "A branch must have a location"],
        trim : true
    },
    city : {
        type: String,
        required: [true, "A branch must have a location"],
        trim : true
    },
    company_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Companies'
    },
    equipments : [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipments"
    }]
}, { timestamps : true})

const Branch = mongoose.model('Branches', branchSchema)

export default Branch