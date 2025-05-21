const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/auth/register').send({
      email: 'test@example.com',
      password: '123456',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User created');
  });

  it('should not register user with existing email', async () => {
    await new User({ email: 'test@example.com', password: '123456' }).save();
    const res = await request(app).post('/auth/register').send({
      email: 'test@example.com',
      password: '123456',
    });
    expect(res.statusCode).toBe(409);
  });

  it('should login an existing user and return a token', async () => {
    await request(app).post('/auth/register').send({
      email: 'test@example.com',
      password: '123456',
    });

    const res = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: '123456',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should fail login with wrong password', async () => {
    await request(app).post('/auth/register').send({
      email: 'test@example.com',
      password: '123456',
    });

    const res = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: 'wrongpass',
    });

    expect(res.statusCode).toBe(401);
  });
});