import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import express, { json } from 'express'
import connectDB from './config/db'
import errorHandler from './Middleware/errorHandler'
import cors from 'cors'

import corsOption from './config/corsOptioins'

export const app = express()

const PORT = process.env.PORT || 8000

app.use(errorHandler)
app.use(json())
app.use(cookieParser())
app.use(cors({ ...corsOption, credentials: true }))

import Documents from './Routes/taskRoutes'
import User from './Routes/userRoutes'
import log from './utils/logger'

app.use('/task', Documents)
app.use('/user', User)

app.get('/test', (req, res) => {
	res.send('Server is running')
})

connectDB()
app.listen(PORT, () => {
	log.info(`Server running on port ${PORT}`)
})
