import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { getTasks, deleteTask, updateTask, createTask } from '../services/taskService';
import UpdateTaskModal from './UpdateTaskModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import NewTaskModal from './NewTaskModal';
import Modal from 'react-modal';
import Button from './Button';
import Input from './Input';
import { getUsers } from '../services/userService';
import { getAuthStatus } from '../services/authService';

Modal.setAppElement('#root');

const TaskTable = () => {
    let { user } = getAuthStatus();
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState({ id: null, title: '', userId: null });
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                const userOptions = response.map((user) => ({
                    label: user.name,
                    value: user.id,
                }));
                setUsers(userOptions);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        if (user.role === 'ADMIN') {
            fetchUsers();
        }
        fetchTasks();
    }, [user]);

    const handleDeleteClick = (task) => {
        setTaskToDelete(task);
        setIsDeleteModalVisible(true);
    };

    const handleUpdateClick = (task) => {
        setCurrentTask(task);
        setIsUpdateModalVisible(true);
    };

    const handleNewTaskClick = () => {
        setIsNewTaskModalVisible(true);
    };

    const handleUpdateModalClose = () => {
        setIsUpdateModalVisible(false);
        setCurrentTask({ id: null, title: '', userId: null });
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalVisible(false);
        setTaskToDelete(null);
    };

    const handleNewTaskModalClose = () => {
        setIsNewTaskModalVisible(false);
    };

    const handleUpdateModalSave = async () => {
        try {
            const updatedTask = await updateTask(currentTask.id, { title: currentTask.title, userId: currentTask.userId });
            setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
            handleUpdateModalClose();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleNewTaskSave = async (newTask) => {
        try {
            const createdTask = await createTask(newTask);
            setTasks([...tasks, createdTask]);
            handleNewTaskModalClose();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteTask(taskToDelete.id);
            setTasks(tasks.filter(task => task.id !== taskToDelete.id));
            handleDeleteModalClose();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Owner Name',
            selector: row => row.userName,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                user.role === 'ADMIN' ? (
                    <div className='flex flex-row'>
                        <Button onClick={() => handleUpdateClick(row)} variant="primary" size={"small"} className="mr-1">
                            Update
                        </Button>
                        <Button onClick={() => handleDeleteClick(row)} variant="danger" size={"small"}>
                            Delete
                        </Button>
                    </div>
                ) : null
            ),
        },
    ];

    return (
        <div className="p-4">
            {user.role === 'ADMIN' && (
                <Button onClick={handleNewTaskClick} variant="success" className="mb-4">
                    New Task
                </Button>
            )}
            <Input
                label="Search Tasks"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title"
            />
            <DataTable
                title="Task List"
                columns={columns}
                data={filteredTasks}
                progressPending={loading}
                pagination
            />
            <UpdateTaskModal
                isVisible={isUpdateModalVisible}
                task={currentTask}
                setTask={setCurrentTask}
                onClose={handleUpdateModalClose}
                onSave={handleUpdateModalSave}
                users={users}
            />
            <ConfirmDeleteModal
                isVisible={isDeleteModalVisible}
                onClose={handleDeleteModalClose}
                onConfirm={handleDeleteConfirm}
            />
            <NewTaskModal
                isVisible={isNewTaskModalVisible}
                onClose={handleNewTaskModalClose}
                onSave={handleNewTaskSave}
                users={users}
            />
        </div>
    );
};

export default TaskTable;
