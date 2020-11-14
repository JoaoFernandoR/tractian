import {Request, Response, NextFunction} from 'express'
import Branch from '../models/branchModel'


export const getAllBranches = async (request:Request, response:Response, next:NextFunction) => {
    try {

        const result = await Branch.find()

        response.status(200).json({
            status: 'success',
            data: result
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
        const {name, country, state, city} = request.body

        const newBranch = await Branch.create({
            name,
            country,
            state,
            city,
        })

        response.status(200).json({
            status: 'success',
            data: newBranch
        })

    } catch(err) {

        response.status(400).json({
           status: 'Failure',
           message: err.message,
           code : err.code
        })

    }    
}
