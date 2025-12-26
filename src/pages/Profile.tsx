import React from 'react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { User, Bell, Settings, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-app pb-20 md:pb-0">
            <Navbar />

            <main className="container py-6">
                <h1 className="text-2xl font-bold mb-6 text-neutral-900">My Profile</h1>

                <div className="card mb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-700">
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-neutral-900">{user?.name}</h2>
                            <p className="text-neutral-500">{user?.role} • {user?.unit || 'Engineering Faculty'}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                                    <User className="w-4 h-4 text-neutral-600" />
                                </div>
                                <span className="font-medium text-neutral-700">Account Details</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                                    <Bell className="w-4 h-4 text-neutral-600" />
                                </div>
                                <span className="font-medium text-neutral-700">Notifications</span>
                            </div>
                            <div className="w-10 h-6 bg-primary-600 rounded-full relative">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                                    <Settings className="w-4 h-4 text-neutral-600" />
                                </div>
                                <span className="font-medium text-neutral-700">Settings</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-100">
                        <Button variant="outline" fullWidth onClick={logout} className="text-red-500 border-red-200 hover:bg-red-50">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default Profile;
