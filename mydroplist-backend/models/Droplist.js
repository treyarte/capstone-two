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

            console.log(id);
        const results = await db.query(`
            SELECT droplists.id, description, status, department, droplists.department_id, users.id as stocker_id, users.first_name,
            users.last_name, droplists.forklift_driver_id
            FROM droplists 
            INNER JOIN departments on departments.id = droplists.department_id
            INNER JOIN users on users.id = stocker_id
            WHERE droplists.id = $1 
        `, [id]);

        const droplistResults = results.rows[0];

        const forklift_driver = User.get(droplistResults.forklift_driver_id);

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
                forklift_driver: {
                    id: forklift_driver.id,
                    first_name: forklift_driver.first_name ,
                    last_name: forklift_driver.last_name
                },
                department: {
                    id: droplistResults.department_id,
                    name: droplistResults.department 
                },
                items: []
            }
        }

        return droplist;
    }
}


module.exports = Droplist;