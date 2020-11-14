import {Request, Response, NextFunction} from 'express'
import User from '../models/userModel'


export const getAllUsers = (request:Request, response:Response, next:NextFunction) => {
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

export const createUser = async (request:Request, response:Response, next:NextFunction) => {
    try {
        const {name, email, role} = request.body

        const newUser = await User.create({
            name,
            email,
            role
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
