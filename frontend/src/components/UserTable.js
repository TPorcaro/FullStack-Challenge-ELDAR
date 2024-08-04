import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { getUsers, deleteUser, updateUser, createUser } from '../services/userService';
import UpdateUserModal from './UpdateUserModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import NewUserModal from './NewUserModal';
import Modal from 'react-modal';
import Button from './Button';
import Input from './Input';

Modal.setAppElement('#root');

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isNewUserModalVisible, setIsNewUserModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', role: '' });
    const [userToDelete, setUserToDelete] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setIsDeleteModalVisible(true);
    };

    const handleUpdateClick = (user) => {
        setCurrentUser(user);
        setIsUpdateModalVisible(true);
    };

    const handleNewUserClick = () => {
        setIsNewUserModalVisible(true);
    };

    const handleUpdateModalClose = () => {
        setIsUpdateModalVisible(false);
        setCurrentUser({ id: null, name: '', email: '', role: '' });
    };

    const handleDeleteModalClose = () => {
        setIsDeleteModalVisible(false);
        setUserToDelete(null);
    };

    const handleNewUserModalClose = () => {
        setIsNewUserModalVisible(false);
    };

    const handleUpdateModalSave = async () => {
        try {
            const updatedUser = await updateUser(currentUser.id, { name: currentUser.name, email: currentUser.email, role: currentUser.role });
            setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            handleUpdateModalClose();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleNewUserSave = async (newUser) => {
        try {
            const createdUser = await createUser(newUser);
            setUsers([...users, createdUser]);
            handleNewUserModalClose();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteUser(userToDelete.id);
            setUsers(users.filter(user => user.id !== userToDelete.id));
            handleDeleteModalClose();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(search.toLowerCase()) || user.role.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            name: 'Username',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <Button onClick={() => handleUpdateClick(row)} variant="primary" className="mr-2">
                        Update
                    </Button>
                    <Button onClick={() => handleDeleteClick(row)} variant="danger">
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            <Button onClick={handleNewUserClick} variant="primary" className="mb-4">
                New User
            </Button>
            <Input
                label="Search Users"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by email or role"
            />
            <DataTable
                title="User List"
                columns={columns}
                data={filteredUsers}
                progressPending={loading}
                pagination
            />
            <UpdateUserModal
                isVisible={isUpdateModalVisible}
                user={currentUser}
                setUser={setCurrentUser}
                onClose={handleUpdateModalClose}
                onSave={handleUpdateModalSave}
            />
            <ConfirmDeleteModal
                isVisible={isDeleteModalVisible}
                onClose={handleDeleteModalClose}
                onConfirm={handleDeleteConfirm}
            />
            <NewUserModal
                isVisible={isNewUserModalVisible}
                onClose={handleNewUserModalClose}
                onSave={handleNewUserSave}
            />
        </div>
    );
};

export default UserTable;
