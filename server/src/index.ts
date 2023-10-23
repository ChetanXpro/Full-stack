import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import express, { json } from 'express'
import connectDB from './config/db'
import errorHandler from './Middleware/errorHandler'
import cors from 'cors'

import corsOption from './config/corsOptioins'
const app = express()

const PORT = process.env.PORT || 3003
app.use(errorHandler)
app.use(json())
app.use(cookieParser())
app.use(cors({ ...corsOption, credentials: true }))

import Documents from './Routes/taskRoutes'
import User from './Routes/userRoutes'

app.use('/task', Documents)
app.use('/user', User)

connectDB()
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
