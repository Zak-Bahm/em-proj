import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import { taskRoutes } from '../taskRoutes.js'
import { Task } from '../../models/taskModel.js' // Import the actual Task model

describe('Task Routes', () => {
  const app = express()
  app.use(express.json()) // Middleware for parsing JSON bodies
  app.use('/api/tasks', taskRoutes)

  beforeEach(() => {
    vi.restoreAllMocks() // Ensure mocks are cleared before each test
  })

  it('should create a new task', async () => {
    const newTask = {
      userId: '1',
      title: 'Test Task',
      category: 'Work',
      description: 'Test Description'
    }

    // Mock Task.create for this test
    vi.spyOn(Task, 'create').mockResolvedValue(newTask)

    const res = await request(app).post('/api/tasks').send(newTask)

    expect(res.statusCode).toBe(201)
    expect(res.body.status).toBe('success')
    expect(res.body.data.task.title).toBe('Test Task')
  })

  it('should delete a task by ID', async () => {
    const taskId = '1234567890abcdef12345678' // Example Task ID

    // Mock Task.findByIdAndDelete for this test
    vi.spyOn(Task, 'findByIdAndDelete').mockResolvedValue({ _id: taskId })

    const res = await request(app).delete(`/api/tasks/${taskId}`)

    expect(res.statusCode).toBe(204) // No content
    expect(res.body).toEqual({}) // Response body should be empty on successful delete
  })

  it('should return 404 if task to delete is not found', async () => {
    const taskId = '1234567890abcdef12345678' // Example Task ID

    // Mock Task.findByIdAndDelete to return null (task not found)
    vi.spyOn(Task, 'findByIdAndDelete').mockResolvedValue(null)

    const res = await request(app).delete(`/api/tasks/${taskId}`)

    expect(res.statusCode).toBe(404)
    expect(res.body.status).toBe('fail')
    expect(res.body.message).toBe('Task not found')
  })

  // Get all tasks
  it('should return all tasks', async () => {
    const tasks = [
      { _id: '1', title: 'Task 1' },
      { _id: '2', title: 'Task 2' }
    ]

    // Mock Task.find to return the list of tasks
    vi.spyOn(Task, 'find').mockResolvedValue(tasks)

    const res = await request(app).get('/api/tasks')

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe('success')
    expect(res.body.data.tasks.length).toBe(2)
    expect(res.body.data.tasks[0].title).toBe('Task 1')
  })

  // Get a task by ID
  it('should return a task by ID', async () => {
    const taskId = '1234567890abcdef12345678'
    const task = { _id: taskId, title: 'Test Task' }

    // Mock Task.findById to return the task
    vi.spyOn(Task, 'findById').mockResolvedValue(task)

    const res = await request(app).get(`/api/tasks/${taskId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe('success')
    expect(res.body.data.task.title).toBe('Test Task')
  })

  it('should return 404 if task is not found', async () => {
    const taskId = '1234567890abcdef12345678'

    // Mock Task.findById to return null
    vi.spyOn(Task, 'findById').mockResolvedValue(null)

    const res = await request(app).get(`/api/tasks/${taskId}`)

    expect(res.statusCode).toBe(404)
    expect(res.body.status).toBe('fail')
    expect(res.body.message).toBe('Task not found')
  })

  // Update a task by ID
  it('should update a task by ID', async () => {
    const taskId = '1234567890abcdef12345678'
    const task = {
      _id: taskId,
      title: 'Old Task',
      save: vi.fn().mockResolvedValue({ _id: taskId, title: 'Updated Task' }) // Mock the save method
    }

    // Mock Task.findById to return the task with the mocked save method
    vi.spyOn(Task, 'findById').mockResolvedValue(task)

    const res = await request(app).put(`/api/tasks/${taskId}`).send({ title: 'Updated Task' })

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe('success')
    expect(res.body.data.task.title).toBe('Updated Task')
  })

  it('should return 404 if task to update is not found', async () => {
    const taskId = '1234567890abcdef12345678'

    // Mock Task.findById to return null
    vi.spyOn(Task, 'findById').mockResolvedValue(null)

    const res = await request(app).put(`/api/tasks/${taskId}`).send({ title: 'Updated Task' })

    expect(res.statusCode).toBe(404)
    expect(res.body.status).toBe('fail')
    expect(res.body.message).toBe('Task not found')
  })

  // Add a new test for task categorization:
  it('should categorize a task', async () => {
    const taskId = '1234567890abcdef12345678';
    const updatedTask = {
      _id: taskId,
      title: 'Test Task',
      category: 'Urgent + Important',
      save: vi.fn().mockResolvedValue({ _id: taskId, title: 'Test Task', category: 'Urgent + Important' }) // Mock the save method
    };

    vi.spyOn(Task, 'findById').mockResolvedValue(updatedTask);
    vi.spyOn(Task.prototype, 'save').mockResolvedValue(updatedTask);

    const res = await request(app).put(`/api/tasks/${taskId}`).send({ category: 'Urgent + Important' });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.task.category).toBe('Urgent + Important');
  });

})

