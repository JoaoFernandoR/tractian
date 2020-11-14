import express from 'express'

import { getAllUsers, createUser } from '../controllers/usercontroller'

const routes = express.Router()


// api/v1/users
routes.route('/')
.get(getAllUsers)
.post(createUser)


export default routes