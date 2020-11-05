const db = require('../db')
const bcrypt = require('bcrypt')
const {BCRYPT_WORK_FACTOR} = require('../config')


/**
 * The user class that communicates with the users table in the database
 */
class User {
    /**
     * Creates a new user and hashes its password
     */
    static async register(userData){
        let {email, password, first_name, last_name, department_id, role_id} = userData;

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const results = await db.query(
            `INSERT INTO users (email, password, first_name, last_name, department_id, role_id)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
             [
                 email,
                 hashedPassword,
                 first_name,
                 last_name,
                 department_id,
                 role_id
             ]
        );

        return {user: results.rows[0]}
    }

    /**
     * Retrieves a list of users' first_name, last_name, department, role,  
     *  returns: users: [list of users]
     */
    static async getAll(){
        const results = await db.query(
            `SELECT users.id, first_name, last_name, department, role FROM users 
            INNER JOIN roles ON roles.id = users.role_id
            INNER JOIN departments ON departments.id = users.department_id`
        )

        return {users: results.rows}
    }

    /**
     * Retrieve a single user
     * input: id
     * returns: user: {userData}
     */
    static async get(id){
        const results = await db.query(
            `SELECT users.id, first_name, last_name, email, department, role
            FROM users INNER JOIN roles ON roles.id = users.role_id INNER JOIN
            departments ON departments.id = users.department_id WHERE users.id = $1
            `, [id]
        );
        const user = results.rows[0]
        
        if(!user) {
            let error = new Error('User not found')
            error.status = 404;
            throw error;
        }

        return {user: results.rows[0]}
    }

    /**
     * Updates a user 
     * currently replaces the user will update later
     * input: user id, user_credentials
     * returns: user: {userData}
     */
    static async update(update_id, userData){
        const {first_name, last_name, email, department_id, password, role_id} = userData
        const hashedUpdatedPassword = bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const results = await db.query(
            `UPDATE users SET first_name=$1, last_name=$2, email=$3, department_id=$4, role_id=$5, password=$6
            WHERE id = $7 RETURNING id`,
            [
                first_name,
                last_name,
                email,
                department_id,
                role_id,
                hashedUpdatedPassword,
                update_id
            ]
        );
        const {id} = results.rows[0];
        
        const updatedUser =  await User.get(id);

        return updatedUser;
    }

    /**
     * Deletes a user
     * input: id
     * returns: boolean (true)
     */
    static async delete(id){
        const results = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

        if(results.rows.length === 0){
            const error = new Error("user not found");
            error.status = 404;
            throw error
        } else {
            return true;
        }
    }
}

module.exports = User