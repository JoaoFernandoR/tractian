import {Request, Response, NextFunction} from 'express'
import Branch from '../models/branchModel'
import Company from '../models/companyModel'


export const getAllBranches = async (request:Request, response:Response, next:NextFunction) => {
    try {
        const { id } = request.params

        const result = await Company.findById(id).populate("branches").populate({
            path : 'branches',
            populate: {
                path: 'equipments'
            }
        })

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

export const createBranch = async (request:Request, response:Response, next:NextFunction) => {
    try {
        const { id } = request.params

        const {name, country, state, city} = request.body

        
        const newBranch = await Branch.create({
            name,
            country,
            state,
            city,
            company_id: id
        })
        
        const companyById = await Company.findById(id) as any

        companyById.branches.push(newBranch)

        await companyById?.save()

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
