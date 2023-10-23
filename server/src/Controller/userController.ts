import User from '../Models/User'
import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// @ Create new user
export const createNewUser = asyncHandler(async (req: any, res: any) => {
	const { email, password } = req.body

	if (!password || !email) {
		return res.status(400).json({ message: 'Al fields are require' })
	}

	const duplicates = await User.find({ email }).lean().exec()

	if (duplicates.length) {
		return res.status(409).json({
			message: 'Email already exist',
		})
	}

	const hashedPwd = await bcrypt.hash(password, 10)

	const userObject = { email, password: hashedPwd }

	const user = await User.create(userObject)

	if (!user) res.status(400).json({ messssage: `Invalid user data recevied` })

	res.status(201).json({ message: 'User created successfully' })
})

export const getUserById = asyncHandler(async (req: any, res: any) => {
	const id = req.id

	if (!id) {
		return res.sendStatus(500).json({ success: false, message: 'something went wrong' })
	}

	const foundUser = await User.findById(id)

	if (!foundUser) return res.status(400).json({ success: false, message: 'No user found with this id' })

	const userInfo = {
		email: foundUser.email,
	}

	res.status(200).json(userInfo)
})

export const login = asyncHandler(async (req: any, res: any) => {
	const cookies = req.cookies
	console.log(req.body)
	const { email, password } = req.body
	if (!email || !password) {
		res.status(400).json({ message: 'All field are required' })
	}

	const foundUser = await User.findOne({ email }).exec()

	if (!foundUser) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	const match = bcrypt.compare(password, foundUser.password!)

	if (!match) return res.status(401).json({ message: 'Unauthorized' })
	const secret = process.env.ACCESS_TOKEN_SECRET || ''
	const accessToken = jwt.sign(
		{
			sub: foundUser.id,
		},
		secret,
		{ expiresIn: '1h' }
	)

	const refreshToken = jwt.sign({ sub: foundUser.id }, process.env.REFRESH_TOKEN_SECRET!, {
		expiresIn: '24h',
	})

	foundUser.refreshToken = refreshToken
	await foundUser.save()

	if (cookies?.jwt) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
	}

	res.cookie('jwt', refreshToken, {
		// path: '/',
		maxAge: 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: 'None',
		secure: true,
	})

	res.json({ email: foundUser.email, accessToken })
})

export const refreshToken = asyncHandler(async (req: any, res: any) => {
	const cookies = req.cookies
	console.log('cookies', cookies)

	if (!cookies?.jwt) return res.sendStatus(401)
	const refreshToken = cookies.jwt

	const foundUser = await User.findOne({ refreshToken }).exec()

	if (!foundUser) return res.sendStatus(403)

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
		if (err || foundUser.id !== decoded.sub) return res.sendStatus(403)

		const secret = process.env.ACCESS_TOKEN_SECRET || ''
		const accessToken = jwt.sign(
			{
				sub: foundUser.id,
			},
			secret,
			{ expiresIn: '1h' }
		)
		res.json({ accessToken })
	})
})
