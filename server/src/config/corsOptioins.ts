const allowedOrigins = ['https://localhost:3000', 'https://127.0.0.1:3000', 'http://localhost:3000']

const corsOption = {
	origin: (origin: any, callback: any) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not alowed by CORS'))
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
}

export default corsOption
