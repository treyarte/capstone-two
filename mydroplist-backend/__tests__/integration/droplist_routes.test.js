const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
const User = require('../../models/User');
const Droplist = require('../../models/Droplist');

let u1, u2, d1, d2;

describe('Droplist test routes', () => {
    beforeEach(async () => {
        await db.query('DELETE FROM droplists');
        await db.query('DELETE FROM users');

        const {user: user1} = await User.register({
            first_name: 'sam',
            last_name: 'test',
            password: 'Test12345!',
            email: 'Yosemite@sam.com',
            department_id: 2,
            role_id: 2
        });

        u1 = user1;

        const {user: user2} = await User.register({
            first_name: 'emanual',
            last_name: 'test',
            email: 'e@manuel.com',
            password: 'Test12345!',
            department_id: 1,
            role_id: 1
        });

        u2 = user2;

        const {droplist: droplist1} = await Droplist.new({stocker_id: u2.id, description: 'test list', department_id: 2});
        d1 = droplist1;

        const resp = await request(app).post('/login').send({email: u1.email, password: 'Test12345!'});
        const { token } = resp.body;
        
        u1.token = token;

        const resp_2 = await request(app).post('/login').send({email: u2.email, password: 'Test12345!'});
        const { token: token_2 } = resp_2.body;

        u2.token = token_2;
    });

    describe('/droplists GET routes', () => {
        test('should get a list of all droplist for a specific user', async () => {
            const resp = await request(app).get('/droplists').send({token: u2.token});

            expect(resp.statusCode).toBe(200);
            expect(resp.body).toEqual(
                {
                    droplists: [
                        {
                            id: expect.any(Number),
                            description: 'test list',
                            created_at: expect.any(String),
                            status: 'not sent',
                            department_id: expect.any(Number),
                        }
                    ]
                }
            )
        })
        
    })
    
    

    afterAll(async () => {
        db.end();
    })
})
