import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  userId: {
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
    enum: ['None', 'ImportantUrgent', 'ImportantNotUrgent', 'NotImportantUrgent', 'NotImportantNotUrgent'],
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
  },
  completedAt: {
    type: Date,
    default: null
  },
  notified: {
    type: Boolean,
    default: false
  }
})

taskSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

// Check if the model has already been compiled
export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema)
