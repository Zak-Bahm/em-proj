import { User } from '../models/userModel.js'
import { Task } from '../models/taskModel.js'
import bcrypt from 'bcryptjs'

export const userController = {
  //Sign up user
  signUp: async (req, res) => {
    try {
      const { username, email, password } = req.body
      //Check if username, email, and password are provided
      if (!username || !email || !password) {
        return res.status(400).json({
          status: 'fail',
          message: 'Please provide username, email, and password'
        })
      }

      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] })
      if (existingUser) {
        return res.status(400).json({
            status: 'fail',
            message: 'User already exists'
        })
      }

      // Hash the password
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      // Create new user with hashed password
      const newUser = await User.create({ username, email, password: hashedPassword })

      // Returns response if user is created successfully
      res.status(201).json({
        status: 'success',
        data: {
          user: {
            '_id': newUser['_id'],
            username: newUser['username'],
            email: newUser['email']
          }
        }
      })
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }
  },
  //Log in user INCOMPLETE
  logIn: async (req, res) => {
    try {
      //This will handle login functionality. Functionality not complete
      const { email, username, password } = req.body

      if (!email || !password) {
        return res.status(400).json({
          status: 'fail',
          message: 'Please provide email and password'
        })
      }

      const user = await User.findOne({ $or: [{ email }, { username }] }).select('+password')
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found'
        })
      }

      const isCorrectPassword = await bcrypt.compare(password, user.password)
      if (!isCorrectPassword) {
        return res.status(400).json({
          status: 'fail',
          message: 'Incorrect username or password'
        })
      }

      res.status(200).json({
        status: 'login success',
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
  },
  //Get specific user by id
  getUserById: async (req, res) => {
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
  },

  //Update user by id
  updateUserById: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found'
        });
      }

      res.status(200).json({
        status: 'success',
        data: {
          updatedUser: user
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  },

  //Delete user by id
  deleteUserById: async (req, res) => {
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
  },
  //Get all tasks by user
  getAllTasksByUser: async (req, res) => {
    try {
      //Search for user by id
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found'
        })
      }

      // then fetch the tasks
      const tasks = await Task.find({userId: user['_id']})
      res.status(200).json({
        status: 'success',
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
  },
  //Get all tasks by category
  getAllTasksByCategory: async (req, res) => {
    try {
      const { id, category } = req.params
      // Find user by id and then populate tasks
      const user = await User.findById(id)

      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found'
        })
      }

      // then fetch the tasks with the category passed in the parameters
      const tasks = await Task.find({userId: user['_id'], category})
      res.status(200).json({
        status: 'success',
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
  },
  //Get all tasks by date
  getAllTasksByDate: async (req, res) => {
    try {
      const { id, date } = req.params
      // Find user by id and then populate tasks
      const user = await User.findById(id)

      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found'
        })
      }

      // then fetch the tasks with due dates before specified date
      const specifiedDate = new Date(date)
      const tasks = await Task.find({userId: user['_id'], dueDate: { $lt: specifiedDate }})
      res.status(200).json({
        status: 'success',
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
}
