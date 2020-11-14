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
                items: []
            }
        });
    });

    test('should get all droplist from a user', async () => {
        const droplists = await Droplist.getAll(u2.id, u2.role_id);

        expect(droplists).toEqual({
            droplists: [
                {
                    id: expect.any(Number),
                    description: 'test list',
                    created_at: expect.any(Date),
                    status: 'not sent',
                    department_id: expect.any(Number),
                }
            ]
        })
    })
    
    test('should update a droplist', async () => {
        const updatedDroplist = await Droplist.update(d1.id, "updated desc", 3);

        expect(updatedDroplist).toEqual({
            droplist: {
                id: expect.any(Number),
                stocker: {
                    id: u2.id,
                    first_name: u2.first_name,
                    last_name: u2.last_name
                },
                description: 'updated desc',
                status: 'not sent',
                department: {
                    id: 3,
                    name: 'hardlines'
                },
                items: []
            }
        })
    })

    test('should delete a droplist', async () => {
        const isDeleted = await Droplist.delete(d1.id);

        expect(isDeleted).toEqual(true);
    })

    test('should change the status of a droplist', async () => {
        const droplist_id = await Droplist.changeStatus('SENT', d1.id);

        const droplist = await Droplist.get(droplist_id);

        expect(droplist).toEqual({
            droplist: {
                id: expect.any(Number),
                stocker: {
                    id: u2.id,
                    first_name: u2.first_name,
                    last_name: u2.last_name
                },
                description: 'test list',
                status: 'sent',
                department: {
                    id: 2,
                    name: 'sundries'
                },
                items: []
            }
        })
    })
    
    test('should add forklift driver to a droplist', async () => {
        const droplist_id = await Droplist.addDriver(d1.id, u1.id);

        const droplist = await Droplist.get(droplist_id);

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
    })
    


    afterAll(async () => {
        await db.end();
    });
});
