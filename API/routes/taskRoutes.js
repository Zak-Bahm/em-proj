import express from 'express'
import { taskController } from '../controllers/taskController.js'

export const taskRoutes = express.Router()

// Task Endpoints
// Create a new task
taskRoutes.post('/', taskController.createTask)

// Get all tasks
taskRoutes.get('/', taskController.getAllTasks)

// Get a task by ID
taskRoutes.get('/:id', taskController.getTaskById)

// Update a task by ID
taskRoutes.put('/:id', taskController.updateTaskById)

// Delete a task by ID
taskRoutes.delete('/:id', taskController.deleteTaskById)
