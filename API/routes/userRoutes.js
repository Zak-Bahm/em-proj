import express from 'express'
import { userController } from '../controllers/userController.js'

export const userRoutes = express.Router()

// Task Endpoints

// Endpoint to handle user signup
userRoutes.post('/signup', userController.signUp)

// Endpoint to handle user login
userRoutes.post('/login', userController.logIn)

// Endpoint to get user details by ID
userRoutes.get('/:id', userController.getUserById)

// Endpoint to update user details by ID
userRoutes.put('/:id', userController.updateUserById)

// Endpoint to delete user by ID
userRoutes.delete('/:id', userController.deleteUserById)

//get all tasks by user
userRoutes.get('/:id/tasks', userController.getAllTasksByUser)

// getOwnedTaskByCategory
userRoutes.get('/:id/tasks/:category', userController.getAllTasksByCategory)

// getOwnedTaskByDate
userRoutes.get('/:id/tasks/:date', userController.getOwnedTaskByDate)
