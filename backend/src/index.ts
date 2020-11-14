import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
// Rotas
import userRoute from './routes/userRoute'
import companyRoute from './routes/companyRoute'

dotenv.config({path : './config.env'})

const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD)

const app = express()

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

const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log('Conectado na porta 3333...'))