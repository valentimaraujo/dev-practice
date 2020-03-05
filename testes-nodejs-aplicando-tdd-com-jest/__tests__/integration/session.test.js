const request = require('supertest');

const app = require('../../src/app');
const factory = require('../factories');
const truncate = require('../utils/truncate');

const http = request(app);

describe('Authentication', () => {

    beforeEach(async () => {
        await truncate();
    });

    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('User', {
            password: 'secret',
        });

        const response = await http
            .post('/sessions')
            .send({
                email: user.email,
                password: 'secret'
            });

        expect(response.status).toBe(200);
    });

    it('should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User', {
            password: 'secret',
        });

        const response = await http
            .post('/sessions')
            .send({
                email: user.email,
                password: 'secret-fail'
            });

        expect(response.status).toBe(401);
    });

    it('should not authenticate with nonexistent User', async () => {
        const user = await factory.create('User', {
            password: 'secret',
        });

        const response = await http
            .post('/sessions')
            .send({
                email: 'nonexistent.com',
                password: 'secret-fail'
            });

        expect(response.status).toBe(401);
    });

    it('should return JWT token when authenticated', async () => {
        const user = await factory.create('User', {
            password: 'secret',
        });

        const response = await http
            .post('/sessions')
            .send({
                email: user.email,
                password: 'secret'
            });

        expect(response.body).toHaveProperty('token');
    });

    it('should be able to access private routes when authenticated', async () => {
        const user = await factory.create('User', {
            password: 'secret',
        });

        const response = await http
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('should not be able to access private routes without JWT token', async () => {
        const response = await http.get('/dashboard');

        expect(response.status).toBe(401);
    });

    it('should not be able to access private routes with invalid jwt token', async () => {
        const response = await http
            .get('/dashboard')
            .set('Authorization', `Bearer 1234567890`);

        expect(response.status).toBe(401);
    });
})
