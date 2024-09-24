import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import { userRoutes } from '../userRoutes.js'
import { User } from '../../models/userModel.js'
import bcrypt from 'bcryptjs'

describe('User Routes', () => {
  const app = express();
  app.use(express.json()); 
  app.use('/api/users', userRoutes);

  beforeEach(() => {
    vi.restoreAllMocks(); // mocks are cleared before each test
  });

  it('should register a new user', async () => {
    const newUser = {
      email: 'test@example.com',
      password: 'TestPassword123',
      username: 'testuser'
    };

    // Mock bcrypt.hash to resolve a hashed password
    vi.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');

    // Mock User.findOne to return null (no existing user)
    vi.spyOn(User, 'findOne').mockResolvedValue(null);

    // Mock User.create to resolve the new user object
    const createSpy = vi.spyOn(User, 'create').mockResolvedValue({
      _id: '1234567890abcdef12345678',
      ...newUser,
      password: 'hashedpassword'
    });

    const res = await request(app).post('/api/users/signup').send(newUser);

    // Make sure the user was created
    expect(createSpy).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.user.email).toBe('test@example.com');
  });

  it('should log in an existing user', async () => {
    const userLogin = {
      email: 'test@example.com',
      password: 'TestPassword123',
    };

    // Mock bcrypt.compare to return true (passwords match)
    vi.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    // Mock User.findOne to return a user object with a mock for select()
    vi.spyOn(User, 'findOne').mockReturnValue({
      select: vi.fn().mockResolvedValue({
        _id: '1234567890abcdef12345678',
        email: userLogin.email,
        password: 'hashedpassword', // Mocked hashed password
      }),
    });

    const res = await request(app).post('/api/users/login').send(userLogin);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('login success');
    expect(res.body.data.user.email).toBe('test@example.com');
  });

  it('should return 400 for invalid credentials', async () => {
    const invalidLogin = {
      email: 'test@example.com',
      password: 'WrongPassword',
    };

    // Mock bcrypt.compare to return false (passwords don't match)
    vi.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    // Mock User.findOne to return a user with the correct email but wrong password
    vi.spyOn(User, 'findOne').mockReturnValue({
      select: vi.fn().mockResolvedValue({
        _id: '1234567890abcdef12345678',
        email: invalidLogin.email,
        password: 'hashedpassword',
      }),
    });

    const res = await request(app).post('/api/users/login').send(invalidLogin);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('fail');
    expect(res.body.message).toBe('Incorrect username or password');
  });

  it('should update a user\'s profile successfully', async () => {
    const updatedData = {
      email: 'newemail@example.com',
      username: 'newusername',
    };

    // Mock User.findByIdAndUpdate to return the updated user data
    const updateSpy = vi.spyOn(User, 'findByIdAndUpdate').mockResolvedValue({
    _id: '1234567890abcdef12345678',
    email: 'newemail@example.com',
    username: 'newusername',
    });

    const res = await request(app).put('/api/users/1234567890abcdef12345678').send(updatedData);

    expect(updateSpy).toHaveBeenCalled();  // Ensure the update function was called
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.updatedUser.email).toBe('newemail@example.com');
    expect(res.body.data.updatedUser.username).toBe('newusername');
  });

  it('should return 404 if the user is not found during profile update', async () => {
    const updatedData = {
      email: 'newemail@example.com',
      username: 'newusername',
    };

    // Mock User.findByIdAndUpdate to return null (user not found)
    vi.spyOn(User, 'findByIdAndUpdate').mockResolvedValue(null);

    const res = await request(app).put('/api/users/1234567890abcdef12345678').send(updatedData);

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('fail');
    expect(res.body.message).toBe('User not found');
  });

  it('should delete a user successfully', async () => {
    // Mock User.findByIdAndDelete to return the deleted user object
    vi.spyOn(User, 'findByIdAndDelete').mockResolvedValue({
      _id: '1234567890abcdef12345678',
      email: 'test@example.com',
      username: 'testuser',
    });

    const res = await request(app).delete('/api/users/1234567890abcdef12345678');

    expect(res.statusCode).toBe(204);
  });

  it('should return 404 if the user to delete is not found', async () => {
    // Mock User.findByIdAndDelete to return null (user not found)
    vi.spyOn(User, 'findByIdAndDelete').mockResolvedValue(null);

    const res = await request(app).delete('/api/users/1234567890abcdef12345678');

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('fail');
    expect(res.body.message).toBe('User not found');
  });

  it('should return 400 if the user with the given email or username already exists', async () => {
    const newUser = {
      email: 'test@example.com',
      password: 'TestPassword123',
      username: 'testuser',
    };

    // Mock User.findOne to return an existing user (simulating a duplicate)
    vi.spyOn(User, 'findOne').mockResolvedValue({
      _id: '1234567890abcdef12345678',
      email: newUser.email,
      username: newUser.username,
    });

    const res = await request(app).post('/api/users/signup').send(newUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('fail');
    expect(res.body.message).toBe('User already exists');
  });

  it('should return a user by ID successfully', async () => {
    // Mock User.findById to return a user object
    vi.spyOn(User, 'findById').mockResolvedValue({
      _id: '1234567890abcdef12345678',
      email: 'test@example.com',
      username: 'testuser',
    });

    const res = await request(app).get('/api/users/1234567890abcdef12345678');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.user.email).toBe('test@example.com');
    expect(res.body.data.user.username).toBe('testuser');
  });

  it('should return 404 if the user is not found', async () => {
    // Mock User.findById to return null (user not found)
    vi.spyOn(User, 'findById').mockResolvedValue(null);

    const res = await request(app).get('/api/users/1234567890abcdef12345678');

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('fail');
    expect(res.body.message).toBe('User not found');
  });

});
