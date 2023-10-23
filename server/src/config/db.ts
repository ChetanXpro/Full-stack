import { set, connect } from 'mongoose'

// import { info, error as _error } from "./logger";

// const logger = require("./logger");

const connectDB = async () => {
	try {
		set('strictQuery', false)
		const connection = (await connect(process.env.MONGO_URI || '')).connection

		connection.on('connected', () => {
			console.log('MongoDB connected')
		})

		connection.on('error', err => {
			console.error(err)
		})
	} catch (error) {
		console.error(error)
	}
}

export default connectDB
