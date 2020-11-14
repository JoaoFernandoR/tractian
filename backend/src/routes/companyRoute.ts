import express from 'express'

import { getAllCompanies, createACompany } from '../controllers/companycontroller'

const route = express.Router()


// api/v1/companies

route.route('/')
.get(getAllCompanies)
.post(createACompany)


export default route