import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Simulate role based on email or password for demo purposes
        // admin@campus.edu -> ADMIN
        const role = email.includes('admin') ? 'ADMIN' : 'USER';

        try {
            login(email, role);
            navigate('/');
        } catch (err) {
            setError('Failed to login');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-app p-4">
            <div className="card w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-primary-600">Campus Safe</h1>
                    <p className="text-muted">Sign in to report and track incidents</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="student@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <div className="text-sm text-red-500 mb-4">{error}</div>}

                    <div className="flex justify-end mb-4">
                        {/* Simulated Password Reset Link */}
                        <Link to="/forgot-password" className="text-sm text-primary-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" fullWidth>
                        Sign In
                    </Button>

                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-600 font-medium hover:underline">
                            Create an account
                        </Link>
                    </div>
                </form>

                <div className="mt-6 p-3 bg-blue-50 text-blue-800 text-xs rounded-md">
                    <p className="font-bold">Demo Credentials:</p>
                    <p>User: user@test.com / any</p>
                    <p>Admin: admin@test.com / any</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
