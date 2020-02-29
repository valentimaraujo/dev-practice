const bcrypt = require('bcrypt');

const {User} = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should encrypt user password', async () => {
        const user = await User.create({
            name: 'Valentim Araújo',
            email: 'valentim_araujos@yahoo.com.br',
            password: 'secret',
        });

        const compareHash = await bcrypt.compare('secret', user.password_hash);
        expect(compareHash).toBe(true);
    });


});
