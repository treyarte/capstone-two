const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
const Admin = require('../../models/Admin');
const User = require('../../models/User');
let a1, u1, u2;

describe('admin test routes', () => {
    beforeEach(async () => {
        await db.query('DELETE FROM users');

        const {user: user_1} = await User.register({
            first_name: 'trey',
            last_name: 'johnson',
            password: 'Test12345!',
            email: 'trey@trey.com',
            department_id: 1,
            role_id: 1
        });
        u1 = user_1
        a1 = await Admin.makeAdmin(u1.id);

        let resp = await request(app).post('/login').send({email: u1.email, password: 'Test12345!'})
        let token = resp.body;

        u1.token = token;

        const {user: user_2} = await User.register({
            first_name: 'naruto',
            last_name: 'uzamaki',
            password: 'Test12345!',
            email: 'uzamaki@naruto.com',
            department_id: 1,
            role_id: 2
        });
        u2 = user_2;
        resp = await request(app).post('/login').send({email: u2.email, password: 'Test12345!'})
        token = resp.body;

        u2.token = token;
    });

    describe('Admin status routes', () => {
        test('should make a user admin', async () => {
            const resp = await request(app).patch(`/admin/${u2.id}/makeAdmin`).send(u1.token);

            expect(resp.body).toEqual({
                user: {
                    id: expect.any(Number),
                    first_name: 'naruto',
                    last_name: 'uzamaki',
                    is_admin: true
                }
            });
        });

        test('should remove admin status from user', async () => {
            const resp = await request(app).patch(`/admin/${u1.id}/revokeAdmin`).send(u1.token);

            expect(resp.body).toEqual({
                user: {
                    id: expect.any(Number),
                    first_name: u1.first_name,
                    last_name: u1.last_name,
                    is_admin: false
                }
            });
        });
        
    }); 

    afterAll(async () => {
        db.end();
    })
});


