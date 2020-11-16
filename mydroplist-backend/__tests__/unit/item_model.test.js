const db = require('../../db');
const Item = require('../../models/Item');
const Droplist = require('../../models/Droplist');
const User = require('../../models/User');

let d1, d2, u1, u2, i1;

describe('Item model test', () => {
    beforeEach( async () => {
        await db.query('DELETE FROM droplists');
        await db.query('DELETE FROM users');
        await db.query('DELETE FROM items');

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

        const {item: item1} = await Item.new({
            steel_name: 'S409', 
            row_letter: 'A', 
            column_number: 1, 
            description: 'raspberries', 
            droplist_id: d1.id
        });

        i1 = item1;

    });

    test('should create a new item', async () => {
        const item = await Item.new({
            steel_name: 'S409', 
            row_letter: 'A', 
            column_number: 1, 
            description: 'raspberries', 
            droplist_id: d1.id
        });

        expect(item).toEqual({
            item:{
                id: expect.any(Number),
                steel_name: 'S409', 
                row_letter: 'A', 
                column_number: 1, 
                description: 'raspberries', 
                droplist_id: expect.any(Number)
            }
        });
    });

    test('should get a specific item', async () => {
        const item = await Item.get(i1.id);
        expect(item).toEqual({
            item:{
                id: expect.any(Number),
                steel_name: 'S409', 
                row_letter: 'A', 
                column_number: 1, 
                description: 'raspberries', 
                droplist_id: expect.any(Number)
            }
        });
    });
    
    

    afterAll(async () => {
        await db.end();
    })
});
