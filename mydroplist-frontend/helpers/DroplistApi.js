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

    static async getAllDroplist(token){
        try {
            let res = await axios.get(`${BASE_URL}/droplists`, {
                params: {
                  token: token
                }
              });
            return res.data;
        } catch (error) {
            this.errorMessages(error);
        }
    }

    static async addDroplist(token, description, department_id){
        try {
            let res = await axios.post(`${BASE_URL}/droplists/new`, {token, description, department_id});
            return res.data;
        } catch (error) {
            this.errorMessages(error);
        }
    }

    static async deleteDroplist(token, droplist_id){
        try {
            let res = await axios.delete(`${BASE_URL}/droplists/${droplist_id}/delete`, {params: {token}});
            return res.data
        } catch (error) {
            this.errorMessages(error);
        }
    }

    static async sendDroplist(token, droplist_id, forklift_driver_id){
        try {
            let res = await axios.post(`${BASE_URL}/droplists/${droplist_id}/send`, {token, forklift_driver_id});
            return res.data
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