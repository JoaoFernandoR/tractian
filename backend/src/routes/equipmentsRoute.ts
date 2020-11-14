import express from 'express'

import {createEquipment} from '../controllers/equipmentController'


const route = express.Router()

// api/v1/equipments/

route.route('/create/:id').post(createEquipment)


export default route