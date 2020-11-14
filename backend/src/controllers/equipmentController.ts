import {Request, Response, NextFunction} from 'express'
import Equipment from '../models/equipmentModel'


export const getAllEquipments = async (request:Request, response:Response, next:NextFunction) => {
    try {

        const Equipments = await Equipment.find()

        response.status(200).json({
            status: 'success',
            data: Equipments
        })

    } catch(err) {

        response.status(400).json({
           status: 'Failure',
           message: err.message,
           code : err.code
        })

    }    
}

export const createEquipment = async (request:Request, response:Response, next:NextFunction) => {
    try {
        const {name, image, model, description, status, healthscore} = request.body

        const newUser = await Equipment.create({
            name,
            image,
            model,
            description,
            status, healthscore
        })

        response.status(200).json({
            status: 'success',
            data: newUser
        })

    } catch(err) {

        response.status(400).json({
           status: 'Failure',
           message: err.message,
           code : err.code
        })

    }    
}
