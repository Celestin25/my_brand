const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');

beforeAll(async () => {
  const dbURI = "mongodb://localhost:27017/test";
  await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API route tests', () => {
  test('GET / should return "Server is running"', async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Server is running');
  });

  describe('Authentication Routes', () => {
    const userData = { username: "admin@gmail.com", password: "password123" };

    test('POST /login should authenticate user', async () => {
      const response = await request(app).post('/login').send(userData);
      expect(response.statusCode).toBe(200);
      expect(response.body.authorized).toBe(true);
    });
  });

  describe('Blog Routes', () => {
    test('GET /api/posts should retrieve posts', async () => {
      const response = await request(app).get('/api/posts');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('Contact Routes', () => {
    test('GET /api/contact should retrieve contact messages', async () => {
      const response = await request(app).get('/api/contact');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');
      expect(response.body[0]).toHaveProperty('message');
    });
  });

  describe('API Documentation', () => {
    test('GET /api-docs/ should display Swagger API documentation', async () => {
      const response = await request(app).get('/api-docs/');
      expect([200, 301, 302]).toContain(response.statusCode);
    });
  });
});
