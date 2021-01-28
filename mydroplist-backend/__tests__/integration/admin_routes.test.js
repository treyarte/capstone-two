const request = require('superTest');
const add = require('../../app');
const db = require('../../db');
const Admin = require('../../models/Admin');
const User = require('../../models/User');
let a1, u1 ;

describe('admin test routes', () => {
    beforeEach(async () => {
        await db.query('DELETE FROM users');

        const {user: u1} = await User.register({
            first_name: 'sam',
            last_name: 'test',
            password: 'Test12345!',
            email: 'Yosemite@sam.com',
            department_id: 2,
            role_id: 2
        });

        const {user: a1} = await Admin.makeAdmin(u1.id);

        const resp = await request(app).post('/login').send({email: u1.email, password: 'Test12345!'})
        const token = resp.body;

        u1.token = token;

    });
})
