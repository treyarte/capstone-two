const db = require('../db');
const ExpressError = require('../helpers/expressError');
const User = require('./User');

class Droplist {
    /**
     * Creates a new droplist
     */
    static async new(data){
        const {stocker_id, description, department_id} = data;
        
        const status = 'not sent';

        const results = await db.query(`
            INSERT INTO droplists (stocker_id, department_id, status, description) VALUES
            ($1, $2, $3, $4) RETURNING id,stocker_id, department_id, status, description, created_at
        `, [stocker_id, department_id, status, description]);

        const droplistResults = results.rows[0]; 
        const stocker = await User.get(droplistResults.stocker_id);

        //create a class for this
        const department = await db.query(`
            SELECT id, department FROM departments WHERE id = $1
        `, [droplistResults.department_id]);

        const droplist = {
            droplist: {
                id: droplistResults.id,
                status: droplistResults.status,
                description: droplistResults.description,
                stocker: {
                    id: stocker.user.id,
                    first_name: stocker.user.first_name,
                    last_name: stocker.user.last_name
                },
                department: {
                    id: department.rows[0].id,
                    name: department.rows[0].department 
                },
                items: []
            }
        }

        return droplist;
    }

    // static async update(data){
    //     const {description, department_id} = data;

    //     const results = await db.query
    // }

    static async get(id){
        const results = await db.query(`
            SELECT droplists.id, description, status, department, droplists.department_id, users.id as stocker_id, users.first_name,
            users.last_name, droplists.forklift_driver_id
            FROM droplists 
            INNER JOIN departments on departments.id = droplists.department_id
            INNER JOIN users on users.id = stocker_id
            WHERE droplists.id = $1 
        `, [id]);

        const droplistResults = results.rows[0];

       
      

        const droplist = {
            droplist: {
                id: droplistResults.id,
                status: droplistResults.status,
                description: droplistResults.description,
                stocker: {
                    id: droplistResults.stocker_id,
                    first_name: droplistResults.first_name,
                    last_name: droplistResults.last_name
                },
                department: {
                    id: droplistResults.department_id,
                    name: droplistResults.department 
                },
                items: []
            }
        }

        if (droplistResults.forklift_driver_id){
            let forklift_driver = await User.get(droplistResults.forklift_driver_id);

            droplist.forklift_driver = {
                id: forklift_driver.id,
                    first_name: forklift_driver.first_name ,
                    last_name: forklift_driver.last_name
            }
        }

        return droplist;
    }

    static async getAll(user_id, role_id){

        const user_role = role_id === 1 ? 'stocker_id' : 'forklift_driver_id'

        const results = await db.query(`
            SELECT status, droplists.department_id, droplists.id, droplists.created_at, droplists.description
            FROM droplists 
            WHERE droplists.${user_role} = $1
        `, [user_id]);

        const droplists = {
            droplists: [
                ...results.rows
            ]
        }
        return droplists;
    }

    static async update(droplist_id, description, department_id){
        const results = await db.query(`
            UPDATE droplists SET description = $1, department_id = $2
            WHERE id = $3 RETURNING id
        `, [description, department_id, droplist_id]);

        const droplist = await Droplist.get(results.rows[0].id);
        return droplist;
    }
}


module.exports = Droplist;