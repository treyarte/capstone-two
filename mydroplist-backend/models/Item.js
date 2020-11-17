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

        if(!await this.itemExists(id)){
            throw new ExpressError("Item not found", 404);
        }

        const results = await db.query('SELECT * FROM items WHERE id = $1', [id]);

        return {item: results.rows[0]}
    }

    static async getAll(id){
        const results = await db.query('SELECT * FROM items WHERE droplist_id = $1', [id]);

        return {items: results.rows}
    }

    static async update(data){
        const {item_id, steel_name, row_letter, column_number, description} = data;

        if(!await this.itemExists(item_id)){
            throw new ExpressError("Item not found", 404);
        }

        const results = await db.query(
            `UPDATE items SET steel_name=$1, row_letter=$2, column_number=$3, description=$4
             WHERE id = $5 RETURNING *
            `,
            [steel_name, row_letter, column_number, description, item_id]
        );

        return {item: results.rows[0]}
    }

    static async delete(id){
        const results = await db.query('DELETE FROM items WHERE id = $1 RETURNING id', [id]);

        if(results.rows.length === 0){
            const error = new Error("item not found");
            error.status = 404;
            throw error
        } else {
            return true;
        } 
    }

    static async itemExists(id){
        const results = await db.query('SELECT id FROM items WHERE id = $1', [id]);

        return (results.rows.length > 0);
    }
}

module.exports = Item