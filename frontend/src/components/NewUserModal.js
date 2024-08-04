import React, { useState } from 'react';
import CustomModal from './CustomModal';
import Input from './Input';
import Select from './Select';

const NewUserModal = ({ isVisible, onClose, onSave }) => {
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value) {
          error = 'Username cannot be empty';
        }
        break;
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          error = 'Invalid email address';
        }
        break;
      case 'password':
        if (value.length < 8) {
          error = 'Password must be at least 8 characters long';
        } else if (!/[A-Z]/.test(value)) {
          error = 'Password must contain at least one uppercase letter';
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
    return error === '';
  };

  const handleSave = () => {
    const isValid = Object.keys(newUser).every(key => validateField(key, newUser[key]));
    if (isValid) {
      onSave(newUser);
    }
  };

  return (
    <CustomModal
      isVisible={isVisible}
      title="New User"
      content={
        <>
          <Input
            label="Name"
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            placeholder="Enter username"
            required
            error={errors.name}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            error={errors.password}
          />
          <Select
            label="Role"
            name="role"
            value={newUser.role}
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
      onConfirm={handleSave}
    />
  );
};

export default NewUserModal;
