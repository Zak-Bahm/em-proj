import { Task } from '../models/taskModel.js'
import nodemailer from 'nodemailer'
import process from 'process'
import { setInterval } from 'timers';



/**
 * @function taskController
 */
export const taskController = {
  // Get all tasks DEVELOPMENT ONLY
  getAllTasks: async (req, res) => {
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
  },

  getTaskById: async (req, res) => {
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
  },
  // Create a new task
  createTask: async (req, res) => {
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
  },
  // Delete a task by ID
  deleteTaskById: async (req, res) => {
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
  },
  // Update a task by ID
  updateTaskById: async (req, res) => {
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
  },

  notifyUser: async (req, res) => {
    try {
      const now = new Date();
      const tasks = await Task.find();

      tasks.forEach(async (task) => {
        const dueDate = new Date(task.dueDate);
        const timeLeft = dueDate - now;

        const timeBeforeNotification = (24 * 60 * 60 * 1000);  // alert 24hrs before due date

        if (timeLeft <= timeBeforeNotification && task.status !== 'completed' && !task.notified) {
          const user = await req.findById(req.params.id);
          if (user && user.email) {
            sendNotification(user.email, task.title, timeLeft);
            task.notified = true;
            await task.save({
              validateBeforeSave: true
            })
      
            res.status(200).json({
              status: 'success',
              data: {
                task
              }
            })
          }
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      })
    }
  }

}

const sendNotification = (email, taskTitle, timeLeft) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NOTIF_EMAIL,
      pass: process.env.NOTIF_PASS, 
    },
  });

  const mailOptions = {
    from: 'em.task.notify@gmail.com',
    to: email,
    subject: 'Task Reminder',
    text: `Reminder! Your task "${taskTitle}" is due in ${Math.round(timeLeft / 3600000)} hours.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error sending email:', err.message);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

setInterval(taskController.notifyUser, 60000);  // 1min interval