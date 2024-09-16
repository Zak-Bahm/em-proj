const User = require('../models/userModel')

//Sign up user
exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body
    //Check if username, email, and password are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide username, email, and password'
      })
    }
    //Create new user
    const newUser = await User.create({ username, email, password })

    //Returns response if user is created successfully
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

//Log in user INCOMPLETE
exports.logIn = async (req, res) => {
  try {
    //This will handle login functionality. Functionality not complete

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      })
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

//Get specific user by id
exports.getUserById = async (req, res) => {
  try {
    //find user by id
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

//Update user by id INCOMPLETE
exports.updateUserById = async (req, res) => {
  try {
    //find users and update. Functionality not complete
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      })
    }
    //Send find updated user
    const updatedUser = await User.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: {
        updatedUser
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

//Delete user by id
exports.deleteUserById = async (req, res) => {
  try {
    //Find user by id and delete
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
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

//Get all tasks by user
exports.getAllTasksByUser = async (req, res) => {
  try {
    //Search for user by id and populate the tasks
    const user = await User.findById(req.params.id).populate('tasks')
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      })
    }
    res.status(200).json({
      status: 'success',
      data: {
        tasks: user.tasks
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

//Get all tasks by category
exports.getAllTasksByCategory = async (req, res) => {
  try {
    const { userId, category } = req.params
    //Find user by id and then populate tasks with the category passed in the parameters
    const user = await User.findById(userId).populate({
      path: 'tasks',
      match: { category }
    })

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        tasks: user.tasks
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}
