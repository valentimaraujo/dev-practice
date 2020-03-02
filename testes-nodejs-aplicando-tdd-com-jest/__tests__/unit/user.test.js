const bcrypt = require('bcrypt');

const {User} = require('../../src/app/models');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('User', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should encrypt user password', async () => {
        const user = await factory.create('User', {
            password: 'secret',
        });

        const compareHash = await bcrypt.compare('secret', user.password_hash);
        expect(compareHash).toBe(true);
    });


    // it('should generated JWT token', async () => {
    //     const user = await factory.create('User', {
    //         password: 'secret',
    //     });
    //
    //     const compareHash = await bcrypt.compare('secret', user.password_hash);
    //     expect(compareHash).toBe(true);
    // });


});
