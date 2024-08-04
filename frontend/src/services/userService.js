import axios from 'axios';
import { notify } from '../components/Notification';

const API_URL = 'http://localhost:5000/users';

axios.defaults.withCredentials = true;

export async function getUsers() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log('Error response:', error.response);
            notify(`Error fetching user: ${error.response.data.message}`, 'error');
        } else {
            notify('Error fetching user: No response from server', 'error');
        }
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        notify('User deleted successfully', 'success');
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log('Error response:', error.response);
            notify(`Error deleting user: ${error.response.data.message}`, 'error');
        } else {
            notify('Error deleting user: No response from server', 'error');
        }
        throw error;
    }
};

export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, user);
        notify('User updated successfully', 'success');
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log('Error response:', error.response);
            notify(`Error updating user: ${error.response.data.message}`, 'error');
        } else {
            notify('Error updating user: No response from server', 'error');
        }
        throw error;
    }
};

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}`, user);
        notify('User created successfully', 'success');
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log('Error response:', error.response);
            notify(`Error creating user: ${error.response.data.message}`, 'error');
        } else {
            notify('Error creating user: No response from server', 'error');
        }
        throw error;
    }
};