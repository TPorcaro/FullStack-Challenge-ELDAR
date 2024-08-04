import axios from 'axios';
import { notify } from '../components/Notification';

const API_URL = 'http://localhost:5000/tasks';

axios.defaults.withCredentials = true;

export async function getTasks() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('Error response:', error.response);
      notify(`Error fetching tasks: ${error.response.data.message}`, 'error');
    } else {
      notify('Error fetching tasks: No response from server', 'error');
    }
    throw error;
  }
};

export async function deleteTask(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    notify('Task deleted successfully', 'success');
  } catch (error) {
    if (error.response) {
      console.log('Error response:', error.response);
      notify(`Error deleting task: ${error.response.data.message}`, 'error');
    } else {
      notify('Error deleting task: No response from server', 'error');
    }
    throw error;
  }
};

export async function updateTask(id, taskData) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, taskData);
    notify('Task updated successfully', 'success');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('Error response:', error.response);
      notify(`Error updating task: ${error.response.data.message}`, 'error');
    } else {
      notify('Error updating task: No response from server', 'error');
    }
    throw error;
  }
};
export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/`, task);
    notify('Task created successfully', 'success');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('Error response:', error.response);
      notify(`Error creating task: ${error.response.data.message}`, 'error');
    } else {
      notify('Error creating task: No response from server', 'error');
    }
    throw error;
  }
};

