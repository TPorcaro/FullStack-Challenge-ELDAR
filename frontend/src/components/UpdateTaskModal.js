import React from 'react';
import CustomModal from './CustomModal';
import Input from './Input';
import Select from './Select';

const UpdateTaskModal = ({ isVisible, task, setTask, onClose, onSave, users }) => {


    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    return (
        <CustomModal
            isVisible={isVisible}
            title="Update Task"
            content={
                <>
                    <Input
                        label="Task Title"
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                    />
                    <Select
                        label="Assign to User"
                        name="userId"
                        value={task.userId || ''}
                        options={users}
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

export default UpdateTaskModal;
