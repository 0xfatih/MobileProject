import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [unit, setUnit] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password || !unit) {
            setError('Please fill in all fields');
            return;
        }

        try {
            register(name, email, unit);
            navigate('/');
        } catch (err) {
            setError('Failed to register');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-app p-4">
            <div className="card w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-primary-600">Join Campus Safe</h1>
                    <p className="text-muted">Create an account to contribute to campus safety</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="student@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Department / Unit"
                        placeholder="Engineering Faculty"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <div className="text-sm text-red-500 mb-4">{error}</div>}

                    <Button type="submit" fullWidth>
                        Create Account
                    </Button>

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600 font-medium hover:underline">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
