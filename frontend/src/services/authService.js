import axios from 'axios';
import { notify } from '../components/Notification';

const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000') + "/auth";

let isAuthenticated = false;
let user = null;

export async function checkAuth() {

    try {
        const response = await axios.get(`${API_URL}/check`, {
            withCredentials: true,
        });
        user = response.data.user;
        isAuthenticated = true;
    } catch (error) {

    } finally {
        return { isAuthenticated, user };
    }
}


export async function login(userInfo) {
    user = userInfo;
    isAuthenticated = true;
};
export async function logout() {
    try {
        await axios.post(`${API_URL}/logout`, {}, {
            withCredentials: true,
        });
        isAuthenticated = false;
        user = null;
    } catch (error) {
        console.log(error.request)
    }
}

export async function loginUser(credentials) {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials, {
            withCredentials: true,
        });
        console.log(response.data);
        login(response.data)
        return response.data;
    } catch (error) {
        if (error.response) {
            notify(`Error at login: ${error.response.data.message}`, 'error');
        } else {
            notify('Error at login: No response from server', 'error');
        }
        throw error;
    }
};
export async function registerUser(data) {
    try {
        const response = await axios.post(`${API_URL}/register`, data, {
            withCredentials: true,
        });
        notify('Registration successful', 'success');
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log('Error response:', error.response);
            notify(`Error at register: ${error.response.data.message}`, 'error');
        } else {
            notify('Error at register: No response from server', 'error');
        }
        throw error;
    }
};

export function getAuthStatus() {
    return { isAuthenticated, user };
};
