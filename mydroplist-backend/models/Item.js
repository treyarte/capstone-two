const db = require('../db');
const ExpressError = require('../helpers/expressError');
const Droplist = require('../models/Droplist');

class Item {
    /**
     * Create new item
     * Input: steel name, row, column, descr, droplist id
     * return item obj
     */
    static async new(data){
        const {steel_name, row_letter, column_number, description, droplist_id} = data;

        const results = await db.query(
            `INSERT INTO items (steel_name, row_letter, column_number, description, droplist_id)
             VALUES ($1, $2, $3, $4, $5) RETURNING *
            `,
            [steel_name, row_letter, column_number, description, droplist_id]
        );
        
        return {item: results.rows[0]}
    }

    static async get(id){
        const results = await db.query('SELECT * FROM items WHERE id = $1', [id]);

        return {item: results.rows[0]}
    }
}

module.exports = Item