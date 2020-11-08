const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

let u1, u2;

describe('test for authentication routes', () => {
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
    });

    describe('/login POST', () => {
        test('should return a valid token for correct credentials', async () => {
            
            const resp = await request(app).post('/login').send({email: u1.email, password: 'Test12345!'});

            const {token} = resp.body;
            
            expect(jwt.decode(token)).toEqual({
                email: 'Yosemite@sam.com',
                is_admin: false,
                iat: expect.any(Number),
                id: expect.any(Number)
            })
        });

        test('should return 401 if invalid credentials', async () => {
            const resp = await request(app).post('/login').send({email: 'noExists', password: 'Test12345!21212'});
            const {status, message} = resp.body;

            expect({status, message}).toEqual({
                status: 401,
                message: 'Invalid Credentials'
            });
        }); 
    });

    describe('/sign-up POST', () => {
        test('should sign up a user and return a token', async () => {
          const resp = await request(app).post('/sign-up').send(
              {
                email: 'tren@gmail.com', 
                password: 'Test12345!', 
                first_name: 'tren', 
                last_name: 'black', 
                department_id: 4, 
                role_id: 2
              }
          );
          
          const {token} = resp.body;
    
          expect(resp.statusCode).toEqual(201);
          expect(jwt.decode(token)).toEqual({
            "email": "tren@gmail.com", 
            "iat": expect.any(Number), 
            "id": expect.any(Number), 
            "is_admin": false
          });
        });
        
    })
    
    

    afterAll(async () =>{
        db.end();
    });
})
