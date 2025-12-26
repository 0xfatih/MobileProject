import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'USER' | 'ADMIN';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    unit?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, role: UserRole) => void;
    register: (name: string, email: string, unit: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persistent login
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse user data:', error);
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (email: string, role: UserRole) => {
        // Mock login - taking email and assigning a mock user
        const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0], // Extract name from email for demo
            email,
            role,
            unit: 'Engineering Faculty'
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
    };

    const register = (name: string, email: string, unit: string) => {
        // Mock register - auto login as USER
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            role: 'USER',
            unit
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
