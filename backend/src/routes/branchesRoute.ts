import express from 'express'
import { createBranch, getAllBranches } from '../controllers/branchController'

const route = express.Router()

// api/v1/branches
route.route('/create/:id').post(createBranch)

route.route('/:id').get(getAllBranches)

export default route