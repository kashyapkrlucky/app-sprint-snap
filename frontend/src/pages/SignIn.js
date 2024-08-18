import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { SIGNIN_MUTATION } from '../graphql/mutations';

const SignIn = () => {
    const { user, login } = useContext(AuthContext);
    const { saveSettings } = useContext(SettingsContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate])


    const [signin, { loading, error }] = useMutation(SIGNIN_MUTATION, {
        onCompleted: (data) => {
            const { token, user, profile } = data.signIn;
            login(user, token);  // Call login function to set user state
            saveSettings(profile);
            navigate('/'); // Redirect to home after successful login
        },
        onError: (error) => {
            console.error('Login failed', error);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin({ variables: { email, password } });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                {error && <p className="text-red-500 mb-4">{error.message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <a href="/sign-up" className="text-blue-500 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
