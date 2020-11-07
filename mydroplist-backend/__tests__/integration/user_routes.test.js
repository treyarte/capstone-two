const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
const User = require('../../models/User');
let u1, u2;

describe('User test routes', () => {
    beforeEach(async () => {
        await db.query('DELETE FROM users');
       
        const {user: user_1} =  await User.register({
            first_name: 'sam',
            last_name: 'test',
            password: 'test',
            email: 'Yosemite@sam.com',
            department_id: 2,
            role_id: 2
        });
        u1 = user_1;
        const {user: user_2} = await User.register({
            first_name: 'emanual',
            last_name: 'test',
            email: 'e@manuel.com',
            password: 'test',
            department_id: 1,
            role_id: 1
        });
        u2 = user_2;

        // const resp = await request(app)
        //   .post(`/login`)
        //   .send({ email: u1.user.email, password: 'test' });

        const resp = await request(app).post('/login').send({email: u1.email, password: 'test'});
        const { token } = resp.body;
        
        u1.token = token;
    });

    describe('/users GET routes', () => {
        test('should get a list of all users', async () => {
            const resp = await request(app).get('/users').send({token: u1.token});

            expect(resp.body).toEqual({users: [  {
                  "department": "sundries",
                  "first_name": "sam",
                  "id": expect.any(Number),
                  "last_name": "test",
                  "role": "forklift-driver",
                },
                {
                  "department": "produce",
                  "first_name": "emanual",
                  "id": expect.any(Number),
                  "last_name": "test",
                  "role": "stocker",
                },]});
            expect(resp.statusCode).toBe(200);
        });
        
    })
    

    afterAll(async () => {
        db.end();
    });
})
