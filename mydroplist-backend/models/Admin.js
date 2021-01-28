const db = require('../db');
const User = require('../models/User');
const ExpressError = require('../helpers/expressError');
const { user } = require('../db');

/**
 * The admin class that communicates with the database and perform admin taskss
 */
const admin_query = `UPDATE users SET is_admin=$1 WHERE id=$2 RETURNING id, first_name, last_name, is_admin`;

class Admin {
   
    /**
     * updates a user to admin
     * @param user_id
     * @returns user: {user_id, first_name, last_name, admin_status}  
     */
    static async makeAdmin(user_id){
        if(!User.userExists(user_id)){
            throw new ExpressError('User not found', 404)
        }

        const results = await db.query(
            admin_query,
            [
                true,
                user_id
            ]
        );

        return {user: results.rows[0]};
    }

    /**
     * change the property admin status to false on a user
     * @param user_id 
     * @returns user: {user_id, first_name, last_name, admin_status}  
     */
    static async revokeAdmin(user_id){
        if(!User.userExists(user_id)){
            throw new ExpressError('User not found', 404);
        }

        const results = await db.query(
            admin_query,
            [
                false,
                user_id
            ]
        );

        return {user: results.rows[0]};
    }
}

module.exports = Admin;