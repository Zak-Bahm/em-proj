const Task = require('../models/taskModel')

// Get all tasks DEVELOPMENT ONLY
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: {
        tasks
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: 'Task not found'
      })
    }
    res.status(200).json({
      status: 'success',
      data: {
        task
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

// Create a new task
exports.createTask = async (req, res) => {
  //Create a new task. Requires user id and title.
  try {
    const newTask = await Task.create({
      userId: req.body.userId,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      tags: req.body.tags,
      color: req.body.color
    })

    //Send task back to front end if successful
    res.status(201).json({
      status: 'success',
      data: {
        task: newTask
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

// Update a task by ID
exports.updateTaskById = async (req, res) => {
  try {
    console.log('updating task with id' + req.params.id)
    //Find task by id
    const task = await Task.findById(req.params.id)
    //If task not found, return error
    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: 'Task not found'
      })
    }

    // Update specific attributes in task.
    Object.keys(req.body).forEach((key) => {
      task[key] = req.body[key]
    })

    //Check if save was successful
    await task.save({
      validateBeforeSave: true
    })

    res.status(200).json({
      status: 'success',
      data: {
        task
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

// Delete a task by ID
exports.deleteTaskById = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: 'Task not found'
      })
    }
    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}
