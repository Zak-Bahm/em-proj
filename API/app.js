import { config } from 'dotenv'
import express from 'express'
import process from 'process'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { taskRoutes } from './routes/taskRoutes.js'
import { userRoutes } from './routes/userRoutes.js'
import cors from 'cors';

config()
var app = express()
const port = process.env.BACKEND_PORT || 3000

// MongoDB connection
const dbURI = process.env.DATABASE_URL

//Connecting to MongoDB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err))

// Middleware
app.use(cors());
app.use(bodyParser.json())
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)

// Basic Route
app.get('/', (req, res) => {
  console.log(`Request url: ${req.url}`)
  res.send('Welcome to the API!')
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
