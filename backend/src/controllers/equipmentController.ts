import {Request, Response, NextFunction} from 'express'
import Branch from '../models/branchModel'
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
        const { id } = request.params

        const newEquipment = await Equipment.create({
            name,
            image,
            model,
            description,
            status, 
            healthscore,
            branch_id : id
        })

        const BranchById = await Branch.findById(id) as any

        BranchById.equipments.push(newEquipment)

        await BranchById?.save()

        response.status(200).json({
            status: 'success',
            data: newEquipment
        })

    } catch(err) {

        response.status(400).json({
           status: 'Failure',
           message: err.message,
           code : err.code
        })

    }    
}

export const getEquipment = async (request:Request, response:Response, next:NextFunction) => {
    try {

        const { branchid } = request.params
        const Equipments = await Equipment.find({branch_id : branchid})

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
