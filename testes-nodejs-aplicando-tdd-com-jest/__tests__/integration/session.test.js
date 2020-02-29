const request = require('supertest');

const app = require('../../src/app');
const {User} = require('../../src/app/models');
const truncate = require('../utils/truncate');

const http = request(app);

describe('Authentication', () => {

    beforeEach(async () => {
        await truncate();
    })

    it('should authenticate with valid credentials', async () => {
       const user = await User.create({
           name: 'Valentim Araújo',
           email: 'valentim_araujos@yahoo.com.br',
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
        const user = await User.create({
            name: 'Valentim Araújo',
            email: 'valentim_araujos@yahoo.com.br',
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
})
