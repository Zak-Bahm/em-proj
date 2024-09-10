const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Task Endpoints

// Endpoint to handle user signup
router.post('/signup', userController.signUp);

// Endpoint to handle user login
router.post('/login', userController.logIn);

// Endpoint to get user details by ID
router.get('/:id', userController.getUserById);

// Endpoint to update user details by ID
router.put('/:id', userController.updateUserById);

// Endpoint to delete user by ID
router.delete('/:id', userController.deleteUserById);
// //get all tasks by user
// router.get('/:id/tasks', userController.getAllTasksByUser);

module.exports = router;