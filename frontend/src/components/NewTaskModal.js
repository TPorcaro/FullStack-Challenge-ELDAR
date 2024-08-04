import React, { useState } from 'react';
import CustomModal from './CustomModal';
import Input from './Input';
import Select from './Select';

const NewTaskModal = ({ isVisible, onClose, onSave, users }) => {
    const [newTask, setNewTask] = useState({ title: '', description: '', userId: '' });

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(newTask);
    };

    return (
        <CustomModal
            isVisible={isVisible}
            title="New Task"
            content={
                <>
                    <Input
                        label="Task Title"
                        type="text"
                        name="title"
                        value={newTask.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                    />
                    <Input
                        label="Task Description"
                        type="text"
                        name="description"
                        value={newTask.description}
                        onChange={handleChange}
                        placeholder="Enter task description"
                        required
                    />
                    <Select
                        label="Assign to User"
                        name="userId"
                        value={newTask.userId}
                        options={users}
                        onChange={handleChange}
                        required
                    />
                </>
            }
            onClose={onClose}
            onConfirm={handleSave}
        />
    );
};

export default NewTaskModal;
