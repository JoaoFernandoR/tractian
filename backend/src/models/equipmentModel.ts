import mongoose from 'mongoose'

const equipmentSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "A Equipment must have a name"],
        unique: true,
        trim: true,
        minlength: [3, 'Must be more than 3 letters'],
        maxlength: [50, 'Must be less than 50 letters']
    },
    image : {
        type: String,
        required: [true, "A equipment must have an image"],
        trim: true
    },
    model : {
        type: String,
        required: [true, "What is the Equipment model ?"],
        trim : true,
        maxlength: [50, 'Must be less than 50 letters']
    },
    description : {
        type: String,
        required: [true, "A branch must have a location"],
        trim : true,
        maxlength: [100, 'Must be less than 50 letters']
    },
    status: {
        type: String,
        enum: ['Em manutenção', 'Desativado', 'Disponível'],
        required: true,
    },
    healthscore: {
        type: Number,
        required: [true, 'Please inform the equipment healthscore']
    }
}, { timestamps : true})

const Equipment = mongoose.model('Equipments', equipmentSchema)

export default Equipment