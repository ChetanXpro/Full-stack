import { Schema, model } from 'mongoose'

const schema = new Schema(
	{
		email: {
			type: String,

			require: true,
		},
		password: {
			type: String,

			require: true,
		},
		profilePicture: {
			type: String,
		},
		refreshToken: String,
	},
	{
		timestamps: true,
	}
)

export default model('User', schema)
