import {Request, Response, NextFunction} from 'express'
import Company from '../models/companyModel'


export const getAllCompanies = (request:Request, response:Response, next:NextFunction) => {
    try {

        response.status(200).json({
            status: 'success',
            message: 'connection successfull'
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

        const CompanyCreated = Company.create({
            
        })

        response.status(200).json({
            status: 'success',
            message: 'connection successfull'
        })

    } catch(err) {

        response.status(400).json({
           status: 'Failure',
           message: err.message,
           code : err.code
        })

    }    
}