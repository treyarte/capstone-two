import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { TouchableWithoutFeedbackBase } from 'react-native';

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

    static async getDroplist(token, id){
        try {
            let res = await axios.get(`${BASE_URL}/droplists/${id}`, {params: {token}});
            return res.data
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
    
    static async editDroplist(token, id, formData){
        try {
            const {description, department_id} = formData;
            let res = await axios.patch(`${BASE_URL}/droplists/${id}/update`, {token, description, department_id});
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
            let res = await axios.patch(`${BASE_URL}/droplists/${droplist_id}/send`, {token, forklift_driver_id});
            return res.data;
        } catch (error) {
            this.errorMessages(error);
        }
    }

    static async getItem(token,droplist_id, id){
        try {
            let res = await axios.get(`${BASE_URL}/droplists/${droplist_id}/items/${id}`, {params: {token}});
            return res.data;
        } catch (error) {
            this.errorMessages(error);
        }
    }

    static async addItem(token, id, formData){
        try {
            const {steel_name, row_letter, column_number, description} = formData;
            let res = await axios.post(`${BASE_URL}/droplists/${id}/items/new`, {token, steel_name, row_letter, column_number, description});
            return res.data;
        } catch (error) {
            this.errorMessages(error);
        }
    }

    static async editItem(token, droplist_id, id, formData){
        try {
            const {steel_name, row_letter, column_number, description} = formData;
            let res = await axios.patch(`${BASE_URL}/droplists/${droplist_id}/items/${id}`, {token, steel_name, row_letter, column_number, description});
            return res.data;
        } catch (error) {
            this.errorMessages(error);
        }
    }


    static async deleteItem(token, droplist_id, item_id){
        try {
            let res = await axios.delete(`${BASE_URL}/droplists/${droplist_id}/items/${item_id}`, {params: {token}});
            return res.data;
        } catch (error) {
            this.errorMessages(error);
        }
    }

    static async getForkliftDrivers(token){
        try {
            let res = await axios.get(`${BASE_URL}/users`, {params: {token, option: 'forklift_driver'}});
            return res.data;
        } catch (error) {
            this.errorMessages(error);
        }
    }

    static async acceptDroplist(token, id){
        try{
            let res = await axios.patch(`${BASE_URL}/droplists/${id}/accept`, {token});
            return res.data;
        } catch (error){
            this.errorMessages(error);
        }
    }

    static async rejectDroplist(token, id){
        try{
            let res = await axios.patch(`${BASE_URL}/droplists/${id}/decline`, {token});
            return res.data;
        } catch (error){
            this.errorMessages(error);
        }
    }

    static async completeDroplist(token, id){
        try {
            let res = await axios.patch(`${BASE_URL}/droplists/${id}/complete`, {token});
            return res.data;
        } catch (error) {
            this.errorMessages(error);
        }
    }

    /**
     * 
     * user methods 
     */
    static async getUser(token, id){
        try {
            let res = await axios.get(`${BASE_URL}/users/${id}`, {params: {token}});
            return res.data;
        } catch (error) {
            this.errorMessages(error);
        }
    }

    static async updateUser(token, id, data){
        try {
            
            let res = await axios.put(`${BASE_URL}/users/${id}`,
            {
                token, 
                first_name: data.firstName,
                last_name: data.lastName,
                department_id: data.department,
                role_id: data.role,
                password: data.password,
                email:   data.email
            })
            return res.data;
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