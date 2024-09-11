require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = 3000

// MongoDB connection
const dbURI = process.env.DATABASE_URL
//Connecting to MongoDB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err))

// Middleware
app.use(bodyParser.json())
app.use('/api/tasks', require('./routes/taskRoutes.js'))
app.use('/api/users', require('./routes/userRoutes.js'))

// Basic Route
app.get('/', (req, res) => {
  console.log('Request Recieved')
  res.send('Welcome to the API!')
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
