import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
// Rotas
import userRoute from './routes/userRoute'
import companyRoute from './routes/companyRoute'
import branchesRoute from './routes/branchesRoute'
import equipmentsRoute from './routes/equipmentsRoute'

dotenv.config({path : './config.env'})

const DB = process.env.DATABASE

// .replace("<password>", process.env.DATABASE_PASSWORD) now will

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(DB, {
	useNewUrlParser : true, 
	useUnifiedTopology : true, 
    useFindAndModify : false,
    useCreateIndex: true
}).then(con => console.log("DB connection successfull")).catch(err => console.log(err))

// Rotas
app.use('/api/v1/users', userRoute)
app.use('/api/v1/companies', companyRoute)
app.use('/api/v1/branches', branchesRoute)
app.use('/api/v1/equipments', equipmentsRoute)

const PORT : string|number = process.env.PORT || 3333;

app.listen(PORT, () => console.log('Conectado na porta 3333...'))