import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { registerUser } from '../services/authService';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
        validatePassword(value);
    };

    const validatePassword = (value) => {
        let error = '';
        if (value.length < 8) {
            error = 'Password must be at least 8 characters long';
        } else if (!/[A-Z]/.test(value)) {
            error = 'Password must contain at least one uppercase letter';
        }
        setPasswordError(error);
        return error === '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validatePassword(password)) {
            try {
                await registerUser({ name, email, password });
                navigate('/tasks');
            } catch (error) {
                console.error('Registration failed', error);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter your name"
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                        required
                        error={passwordError}
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        disabled={passwordError}
                    >
                        Register
                    </button>
                </form>
                <p className="text-center ">
                    Do you have already registered?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
