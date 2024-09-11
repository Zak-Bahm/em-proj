const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['ImportantUrgent', 'ImportantNotUrgent', 'NotImportantUrgent', 'NotImportantNotUrgent'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  tags: {
    type: [String],
    trim: true
  },
  color: {
    type: String,
    default: '#ffffff'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

taskSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
