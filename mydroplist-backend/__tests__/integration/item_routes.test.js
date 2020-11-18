const request = require('supertest');
const app = require('../../app');
const db = require('../../db');
const Item = require('../../models/Item');
const Droplist = require('../../models/Droplist');
const User = require('../../models/User');

let u1, u2, d1, d2, i1, i2;

describe('items test routes', () => {
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

        const {item: item1} = await Item.new({
            steel_name: 'S409', 
            row_letter: 'A', 
            column_number: 1, 
            description: 'raspberries', 
            droplist_id: d1.id
        });

        i1 = item1;

        const {item: item2} = await Item.new({
            steel_name: 'Center', 
            row_letter: 'B', 
            column_number: 9, 
            description: 'soda', 
            droplist_id: d1.id
        });

        i2 = item2;
        
    });

    test('should create a new item and return the droplist of that item', async () => {
        const resp = await request(app).post(`/droplists/${d1.id}/items/new`).send({
            steel_name: 'S409',
            row_letter: 'A', 
            column_number: 2, 
            description: 'strawberries',
            token: u2.token
        });

        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
                item:
                    {
                        id: expect.any(Number),
                        steel_name: 'S409',
                        row_letter: 'A', 
                        column_number: 2, 
                        description: 'strawberries',
                        droplist_id: expect.any(Number)
                    }
                
        });
    });

    test('should get back all items in a droplist', async () => {
        const resp = await request(app).get(`/droplists/${d1.id}/items`).send({token: u2.token});

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            items: [
                {...i1, id: expect.any(Number), droplist_id: expect.any(Number)},
                {...i2, id: expect.any(Number), droplist_id: expect.any(Number)},
            ]
        });
    });

    test('should get a specific item', async () => {
        const resp = await request(app).get(`/droplists/${d1.id}/items/${i1.id}`).send({token: u2.token});

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: {
                ...i1,
                id: expect.any(Number),
                droplist_id: expect.any(Number)
            }
        });
    });
    
    test('should update a specified item', async () => {
        const updateItem = {
            steel_name: 'Update test',
            row_letter: 'C', 
            column_number: 10, 
            description: 'test item'
        }
        const resp = await request(app).patch(`/droplists/${d1.id}/items/${i1.id}`).send({
            ...updateItem,
            token: u2.token
        });

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: {
                ...updateItem,
                id: expect.any(Number),
                droplist_id: expect.any(Number)
            }
        });
    });
    
    test('should delete an item', async () => {
        const resp = await request(app).delete(`/droplists/${d1.id}/items/${i1.id}`).send({token: u2.token});

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            message: 'Item removed'
        })
    })
    
    

    afterAll(async () => {
        db.end();
    });
});
