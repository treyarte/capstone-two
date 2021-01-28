const  {NODE_ENV_TEST} = require('./jest.config');
const db = require('../../db');
const Admin = require('../../models/Admin');
const User = require('../../models/User');
let a1, u1;

describe('Test admin model', () => {
    beforeEach(async () => {
        await db.query('DELETE FROM users');

        u1 = await User.register({
            first_name: 'trey',
            last_name: 'johnson',
            password: 'Test12345!',
            email: 'trey@trey.com',
            department_id: 1,
            role_id: 1
        });
    });

    test('should update user status to admin', async () => {
        const admin = await Admin.makeAdmin(u1.user.id)

        expect(admin).toEqual({
            user: {
                id: expect.any(Number),
                first_name: 'trey',
                last_name: 'johnson',
                is_admin: true
            }
        });
    });

    test('should revoke admin access from user', async () => {
        const admin = await Admin.makeAdmin(u1.user.id)  
        
        const user = await Admin.revokeAdmin(admin.user.id);
        
        expect(user).toEqual({
            user: {
                id: expect.any(Number),
                first_name: 'trey',
                last_name: 'johnson',
                is_admin: false
            }
        })
    });

    
    afterAll(async () => {
        await db.end();
    })
});
