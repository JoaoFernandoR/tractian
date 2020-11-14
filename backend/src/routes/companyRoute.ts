import express from 'express'

import { getAllCompanies, createACompany, getSingleCompany } from '../controllers/companycontroller'

const route = express.Router()


// api/v1/companies

route.route('/')
.get(getAllCompanies)
.post(createACompany)

route.route('/:id').get(getSingleCompany)


export default route