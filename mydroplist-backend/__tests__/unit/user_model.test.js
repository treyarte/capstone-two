const {NODE_ENV_TEST} = require('./jest.config');
const db = require('../../db');
const User = require('../../models/User');

let u1, u2;

describe('User model tests', () => {
    beforeEach(async () => {
        await db.query('DELETE FROM users');
        u1 = await User.register({
            first_name: 'sam',
            last_name: 'test',
            password: 'test',
            email: 'Yosemite@sam.com',
            department_id: 2,
            role_id: 2
        });

        u2 = await User.register({
            first_name: 'emanual',
            last_name: 'test',
            email: 'e@manuel.com',
            password: 'test',
            department_id: 1,
            role_id: 1
        });

    });

    test('should register a new user', async () => {
        
        const newUser = await User.register({
            first_name: 'testUser',
            email: "test@user.com",
            last_name: 'userTest',
            password: 'test',
            department_id: 1,
            role_id: 1
        }); 

        expect(newUser).toEqual({
            user:
            {
                id: expect.any(Number),
                first_name: 'testUser',
                email: "test@user.com",
                last_name: 'userTest',
                password: expect.any(String),
                department_id: 1,
                role_id: 1,
                is_admin: false
            }
        });
    });

    test('should return a boolean for duplicate emails', async () => {
       const isUnique =  await User.isUniqueEmail('Yosemite@sam.com');
        
       expect(isUnique).toEqual(true);
    })
    

    test('should get a list of all users', async () => {
        const users = await User.getAll();
        const user_1 = u1.user;
        const user_2 = u2.user;

        expect(users).toEqual({
            users: [

                //computed property names in the future
                {id: user_1.id, first_name: user_1.first_name, last_name: user_1.last_name, 
                    department: "sundries", role: "forklift-driver"},
                {id: user_2.id, first_name: user_2.first_name, last_name: user_2.last_name, department: "produce", role: "stocker"}
            ]
        })
    });

    test('should get a single user', async () => {
        const user = await User.get(u1.user.id);

        expect(user).toEqual({
            user: {
                id: u1.user.id,
                first_name: u1.user.first_name,
                last_name: u1.user.last_name,
                email: u1.user.email,
                department: 'sundries',
                role: 'forklift-driver',
            }
        })
    });

    test(`should update a single user`, async () => {
        const updatedUser = await User.update(u1.user.id,
             {
                 first_name: u1.user.first_name,
                 last_name: u1.user.last_name,
                 email: u1.user.email,
                 password: "new password",
                 department_id: 3,
                 role_id: 1
            });
            

            expect(updatedUser).toEqual({
                user: {
                    id: u1.user.id,
                    first_name: u1.user.first_name,
                    last_name: u1.user.last_name,
                    email: u1.user.email,
                    department: "hardlines",
                    role: "stocker"
                }
            })
    });

    test(`should delete a user`, async () => {
        const isDeleted = await User.delete(u2.user.id);

        expect(isDeleted).toEqual(true);
    });

    test('Should authenticate a valid user email and password', async () => {
        const {user} = await User.authenticate('Yosemite@sam.com', 'test');

        expect(user.first_name).toEqual('sam')
    })
    

    afterAll(async () => {
        await db.end();
    })
    
})
