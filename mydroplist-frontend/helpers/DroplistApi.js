import axios from 'axios';
import jwt_decode from 'jwt-decode';

const BASE_URL = 'http://10.0.2.2:3001'
class DroplistApi {
    static async login(email, password){
        try {
            let res = await axios.post(`${BASE_URL}/login`, {email, password});
            return res.data.token;
        } catch (error) {
           this.errorMessages(error);
        }
    }

    static async signUp(email, password, first_name, last_name, department_id, role_id){
        try {
            let res = await axios.post(`${BASE_URL}/sign-up`, {email, password, first_name, last_name, department_id, role_id})
            return res.data.token
        } catch (error) {
            this.errorMessages(error);
        }
    }

    static errorMessages(error){
        console.error('APIS ERROR:', error);
        let message = error.response.data.message;
        throw Array.isArray(message) ? message : [message];
    }
}

export default DroplistApi;