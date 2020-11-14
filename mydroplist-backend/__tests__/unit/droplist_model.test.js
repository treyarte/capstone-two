const {NODE_ENV_TEST} = require('./jest.config');
const db = require('../../db');
const Droplist = require('../../models/Droplist');
const User = require('../../models/User');

let d1, d2, u1, u2;

describe('Droplist model tests', () => {
    beforeEach( async () => {
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
    });

    test('should create a new droplist', async () => {
        const droplist = await Droplist.new({stocker_id: u2.id, description: 'test list', department_id: 2});
        expect(droplist).toEqual({
            droplist: {
                id: expect.any(Number),
                stocker: {
                    id: u2.id,
                    first_name: u2.first_name,
                    last_name: u2.last_name
                },
                description: 'test list',
                status: 'not sent',
                department: {
                    id: 2,
                    name: 'sundries'
                },
                items: []
            }
        });
    });
    

    test('should get a specific droplist', async () => {
        const droplist = await Droplist.get(d1.id);

        expect(droplist).toEqual({
            droplist: {
                id: expect.any(Number),
                stocker: {
                    id: u2.id,
                    first_name: u2.first_name,
                    last_name: u2.last_name
                },
                description: 'test list',
                status: 'not sent',
                department: {
                    id: 2,
                    name: 'sundries'
                },
                forklift_driver: {
                    id: undefined,
                    first_name: undefined,
                    last_name: undefined
                },
                items: []
            }
        });

    })
    

    afterAll(async () => {
        await db.end();
    });
});
