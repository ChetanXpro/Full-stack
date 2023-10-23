import { log } from 'console'
import Task from '../Models/Task'

import asyncHandler from 'express-async-handler'

// Content creator Service
export const createTask = asyncHandler(async (req: any, res: any) => {
	const { taskName, description, status, priority } = req.body

	if (!taskName || !status) return res.status(400).json({ message: 'Provide all inputs' })

	await Task.create({ taskName, description, status, createdBy: req.id, priority: priority || 'low' })

	res.status(200).json({ success: true, message: `` })
})

export const getAllTask = asyncHandler(async (req: any, res: any) => {
	if (!req.id) return res.status(400).json({ message: 'Please login again' })
	const allApprovedDoc = await Task.find({ createdBy: req.id })

	res.status(200).json({ data: allApprovedDoc })
})

export const editTask = asyncHandler(async (req: any, res: any) => {
	const { id, taskName, description, status, priority } = req.body
	const userId = req.id

	if (!taskName || !status || !id) return res.status(400).json({ message: 'Provide all inputs' })

	// check if user send priority and if send then update it to db

	const editied = await Task.findOneAndUpdate(
		{ _id: id, createdBy: userId },
		{ taskName, description, status, priority },
		{ new: true }
	)

	if (!editied) return res.status(400).json({ message: 'No Task with this id' })
	res.status(200).json({ data: editied })
})

export const changeTaskStatus = asyncHandler(async (req: any, res: any) => {
	const { id, status } = req.body
	const userId = req.id

	if (!status || !id) return res.status(400).json({ message: 'Provide all inputs' })

	// check if user send priority and if send then update it to db

	const editied = await Task.findOneAndUpdate({ _id: id, createdBy: userId }, { status }, { new: true })

	if (!editied) return res.status(400).json({ message: 'No Task with this id' })
	res.status(200).json({ data: editied })
})

export const deleteTask = asyncHandler(async (req: any, res: any) => {
	const id = req.params.id
	const userId = req.id

	if (!id || typeof id !== 'string') return res.status(400).json({ message: 'Provide all inputs' })

	const deleted = await Task.findOneAndDelete({ _id: id, createdBy: userId })

	console.log(deleted)

	if (!deleted) return res.status(400).json({ message: 'No Task with this id' })
	res.status(200).json({ data: deleted })
})

// admin
