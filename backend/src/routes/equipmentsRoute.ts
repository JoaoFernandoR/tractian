import express from 'express'

import {createEquipment, getEquipment} from '../controllers/equipmentController'


const route = express.Router()

// api/v1/equipments/

route.route('/create/:id').post(createEquipment)
route.route('/:branchid').get(getEquipment)

export default route