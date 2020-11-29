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
                            num_items: "0"
                        }
                    ]
                }
            )
        })

        test('should get a specified droplist', async () => {
            const resp =  await request(app).get(`/droplists/${d1.id}`).send({token: u2.token});
            const testDroplist = await Droplist.get(d1.id);
            
            expect(resp.statusCode).toBe(200);
            expect(resp.body).toEqual(testDroplist);
        });

        test('should create a new droplist', async () => {
            const resp = await request(app).post('/droplists/new').send({
                stocker_id: u2.id, 
                description: 'Create new test droplist', 
                department_id: 3,
                token: u2.token
            });

            expect(resp.statusCode).toBe(201);
            expect(resp.body).toEqual({
                droplist: {
                    id: expect.any(Number),
                    status: 'not sent',
                    description: 'Create new test droplist',
                    stocker: {
                        id: u2.id,
                        first_name: u2.first_name,
                        last_name: u2.last_name
                    },
                    department: {
                        id: expect.any(Number),
                        name: 'hardlines' 
                    },
                    items: []
                }
            })
        });

        test('should update a droplist', async () => {
            const resp = await request(app).patch(`/droplists/${d1.id}/update`).send({
                description: 'updated',
                department_id: 1,
                token: u2.token
            });

            expect(resp.statusCode).toBe(200);
            expect(resp.body).toEqual({
                droplist: {
                    id: expect.any(Number),
                    status: 'not sent',
                    description: 'updated',
                    stocker: {
                        id: u2.id,
                        first_name: u2.first_name,
                        last_name: u2.last_name
                    },
                    department: {
                        id: expect.any(Number),
                        name: 'produce' 
                    },
                    items: []
                }
            });
        });
        
        test('should delete a droplist', async () => {
            const resp = await request(app).delete(`/droplists/${d1.id}/delete`).send({token: u2.token});

            expect(resp.statusCode).toBe(200);
            expect(resp.body).toEqual({
                message: 'droplist successfully deleted'
            });
        });

        test('should add a forklift driver to a droplist', async () => {
            const resp = await request(app).patch(`/droplists/${d1.id}/send`).send({forklift_driver_id: u1.id, token: u2.token});

            expect(resp.statusCode).toBe(200);
            expect(resp.body).toEqual({
                droplist: {
                    id: expect.any(Number),
                    stocker: {
                        id: u2.id,
                        first_name: u2.first_name,
                        last_name: u2.last_name
                    },
                    description: 'test list',
                    status: 'sent',
                    forklift_driver:{
                        id: u1.id,
                        first_name: u1.first_name,
                        last_name: u1.last_name
                    },
                    department: {
                        id: 2,
                        name: 'sundries'
                    },
                    items: []
                }
            })
        });


        test('should accept a droplist', async () => {
            
           await request(app).patch(`/droplists/${d1.id}/send`).send({forklift_driver_id: u1.id, token: u2.token});

            const resp = await request(app).patch(`/droplists/${d1.id}/accept`).send({token: u1.token});

            expect(resp.statusCode).toBe(200);
            expect(resp.body).toEqual({
                message: 'droplist successfully accepted'
            });
        });
        
        test('should decline a droplist', async () => {
            await request(app).patch(`/droplists/${d1.id}/send`).send({forklift_driver_id: u1.id, token: u2.token});
            const resp = await request(app).patch(`/droplists/${d1.id}/decline`).send({token: u1.token});

            expect(resp.statusCode).toBe(200);
            expect(resp.body).toEqual({
                message: 'droplist decline'
            });

        });

        test('should complete a droplist', async () => {
            await request(app).patch(`/droplists/${d1.id}/send`).send({forklift_driver_id: u1.id, token: u2.token});
            const resp = await request(app).patch(`/droplists/${d1.id}/complete`).send({token: u1.token});

            expect(resp.statusCode).toBe(200);
            expect(resp.body).toEqual({
                message: 'droplist successfully completed'
            });

        });
    })
    
    

    afterAll(async () => {
        db.end();
    })
})
