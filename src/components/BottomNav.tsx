import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, PlusCircle, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BottomNav: React.FC = () => {
    const { pathname } = useLocation();
    const { user } = useAuth();

    const isActive = (path: string) => pathname === path ? 'text-primary-600' : 'text-neutral-500';

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 h-16 z-50 px-6 flex items-center justify-between">
            <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/')}`}>
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-medium">Home</span>
            </Link>

            <Link to="/map" className={`flex flex-col items-center gap-1 ${isActive('/map')}`}>
                <Map className="w-6 h-6" />
                <span className="text-[10px] font-medium">Map</span>
            </Link>

            <Link to="/create" className="flex flex-col items-center -mt-6">
                <div className="w-12 h-12 bg-primary-600 rounded-full shadow-lg flex items-center justify-center text-white">
                    <PlusCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-medium text-primary-600 mt-1">Report</span>
            </Link>

            {user?.role === 'ADMIN' ? (
                <Link to="/admin" className={`flex flex-col items-center gap-1 ${isActive('/admin')}`}>
                    <LayoutDashboard className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Admin</span>
                </Link>
            ) : (
                <div className="w-6" /> // Spacer for alignment if not admin
            )}

            <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile')}`}>
                <User className="w-6 h-6" />
                <span className="text-[10px] font-medium">Profile</span>
            </Link>
        </div>
    );
};

export default BottomNav;
