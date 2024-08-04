import React from 'react';
import CustomModal from './CustomModal';
import Input from './Input';
import Select from './Select';

const UpdateUserModal = ({ isVisible, user, setUser, onClose, onSave }) => {
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <CustomModal
            isVisible={isVisible}
            title="Update User"
            content={
                <>
                    <Input
                        label="Name"
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                    <Select
                        label="Role"
                        name="role"
                        value={user.role}
                        options={[
                            { label: 'User', value: 'USER' },
                            { label: 'Admin', value: 'ADMIN' },
                        ]}
                        onChange={handleChange}
                        required
                    />
                </>
            }
            onClose={onClose}
            onConfirm={onSave}
        />
    );
};

export default UpdateUserModal;
