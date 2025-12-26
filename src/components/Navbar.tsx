import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white border-b border-neutral-200 h-16 sticky top-0 z-50">
            <div className="container h-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-xl font-bold text-primary-600 flex items-center gap-2">
                        <span className="p-1.5 bg-primary-100 rounded-lg">
                            <ShieldIcon className="w-6 h-6 text-primary-600" />
                        </span>
                        CampusSafe
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium hover:text-primary-600">Feed</Link>
                    <Link to="/map" className="text-sm font-medium hover:text-primary-600">Map</Link>
                    {user?.role === 'ADMIN' && (
                        <Link to="/admin" className="text-sm font-medium hover:text-primary-600">Admin</Link>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full">
                        <Bell className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 pl-4 border-l border-neutral-200">
                        <div className="hidden sm:block text-right">
                            <p className="text-xs font-bold text-neutral-900">{user?.name}</p>
                            <p className="text-xs text-neutral-500">{user?.role}</p>
                        </div>
                        <Link to="/profile" className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                            {user?.name.charAt(0).toUpperCase()}
                        </Link>
                        <button onClick={logout} className="p-2 text-red-500 hover:bg-red-50 rounded-full" title="Logout">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const ShieldIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

export default Navbar;
