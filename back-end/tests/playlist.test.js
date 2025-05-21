const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Playlist = require('../src/models/Playlist');

let token;

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__);

  // Criar usuário e gerar token
  await request(app).post('/auth/register').send({
    email: 'test2@example.com',
    password: '123456',
  });
  const res = await request(app).post('/auth/login').send({
    email: 'test2@example.com',
    password: '123456',
  });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Playlist.deleteMany();
});

describe('Playlist Routes', () => {
  it('should create a new playlist', async () => {
    const res = await request(app)
      .post('/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'My Playlist' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('My Playlist');
  });

  it('should list playlists for the user', async () => {
    await request(app)
      .post('/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'My Playlist' });

    const res = await request(app)
      .get('/playlists')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should not allow access without token', async () => {
    const res = await request(app).get('/playlists');
    expect(res.statusCode).toBe(401);
  });
});
