import {Request, Response, NextFunction} from 'express'
import Company from '../models/companyModel'


export const getAllCompanies = async (request:Request, response:Response, next:NextFunction) => {
    try {

        const Result = await Company.find().populate("branches").select('-__v').sort('+_id')

        response.status(200).json({
            status: 'success',
            data: Result
        })

    } catch(err) {

        response.status(400).json({
           status: 'Failure',
           message: err.message,
           code : err.code
        })

    }    
}

export const createACompany = async (request:Request, response:Response, next:NextFunction) => {
    try {

        const {name, cnpj} = request.body

        const CompanyCreated = await Company.create({
            name, 
            cnpj
        })

        response.status(200).json({
            status: 'success',
            data: CompanyCreated
        })

    } catch(err) {

        response.status(400).json({
           status: 'Failure',
           message: err.message,
           code : err.code
        })

    }    
}

export const getSingleCompany = async (request:Request, response:Response, next:NextFunction) => {
    try {

        const { id } = request.params

        const company = await Company.findById(id).populate("branches")

        response.status(200).json({
            status: 'success',
            data: company
        })

    } catch(err) {

        response.status(400).json({
           status: 'Failure',
           message: err.message,
           code : err.code
        })

    }    
}
