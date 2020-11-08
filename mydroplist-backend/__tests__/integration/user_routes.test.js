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
            password: 'Test12345!',
            email: 'Yosemite@sam.com',
            department_id: 2,
            role_id: 2
        });
        u1 = user_1;
        const {user: user_2} = await User.register({
            first_name: 'emanual',
            last_name: 'test',
            email: 'e@manuel.com',
            password: 'Test12345!',
            department_id: 1,
            role_id: 1
        });
        u2 = user_2;

        const resp = await request(app).post('/login').send({email: u1.email, password: 'Test12345!'});
        const { token } = resp.body;
        
        u1.token = token;

        const resp_2 = await request(app).post('/login').send({email: u2.email, password: 'Test12345!'});
        const { token: token_2 } = resp_2.body;

        u2.token = token_2;
    });

    describe('/users GET Route', () => {
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
    });

    describe('/users/:id GET Route', () => {
        test('should get a specific user', async () => {
            const resp = await request(app).get(`/users/${u2.id}`).send({token: u2.token});

            expect(resp.body).toEqual({
                user: {
                    first_name: 'emanual',
                    last_name: 'test',
                    email: 'e@manuel.com',
                    department: 'produce',
                    role: 'stocker',
                    id: expect.any(Number)
                }
            });
        }); 
    });
    

    describe('/users/id PUT Route', () => {
        test('should update a specified user', async () => {
            const updatedValues = {
                first_name: 'replace',
                last_name: 'test',
                department_id: 1,
                role_id: 1,
                password: 'Test12345!',
                email: 'Yosemite@sam.com',

            }
            const resp = await request(app).put(`/users/${u1.id}`).send({token: u1.token}).send(updatedValues);

            expect(resp.body).toEqual(
                { user: {

                    id: expect.any(Number),
                    first_name: 'replace',
                    last_name: 'test',
                    department: 'produce',
                    role: 'stocker',
                    email: 'Yosemite@sam.com',
                }
                }
            );
        });

        test('should return an error message for updating a different user', async () => {
            const updatedValues = {
                first_name: 'carl'
            }

            const resp = await request(app).put(`/users/${u1.id}`).send({token: u2.token}).send(updatedValues);

            expect(resp.statusCode).toBe(401);
        });
    });

    describe('/users/:id DELETE Route', () => {
        test('should delete a user and return a success message', async () => {
            const resp = await request(app).delete(`/users/${u1.id}`).send({token: u1.token});

            expect(resp.statusCode).toBe(200);
            expect(resp.body).toEqual({message: "User deleted"});
        })
        
    });

    
    

    afterAll(async () => {
        db.end();
    });
})
