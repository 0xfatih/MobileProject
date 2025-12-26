import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { useIncidents } from '../context/IncidentContext';
import { useAuth } from '../context/AuthContext';
import type { IncidentStatus } from '../types';
import { Megaphone } from 'lucide-react';
import Button from '../components/Button';
import { timeAgo } from '../utils/dateUtils';

const AdminPanel: React.FC = () => {
    const { incidents, updateStatus } = useIncidents();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'INCIDENTS' | 'ALERTS'>('INCIDENTS');
    const [filter, setFilter] = useState<'ALL' | IncidentStatus>('ALL');

    if (user?.role !== 'ADMIN') {
        return (
            <div className="min-h-screen bg-app p-4">
                <h1>Access Denied. Admins Only.</h1>
            </div>
        );
    }

    const filteredIncidents = incidents.filter(inc =>
        filter === 'ALL' || inc.status === filter
    );

    return (
        <div className="min-h-screen bg-app pb-20 md:pb-0">
            <Navbar />

            <main className="container py-6">
                <h1 className="text-2xl font-bold mb-6 text-neutral-900">Admin Dashboard</h1>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-neutral-200 mb-6">
                    <button
                        className={`pb-2 px-1 font-medium text-sm ${activeTab === 'INCIDENTS' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-neutral-500'}`}
                        onClick={() => setActiveTab('INCIDENTS')}
                    >
                        Incident Management
                    </button>
                    <button
                        className={`pb-2 px-1 font-medium text-sm ${activeTab === 'ALERTS' ? 'border-b-2 border-primary-600 text-primary-600' : 'text-neutral-500'}`}
                        onClick={() => setActiveTab('ALERTS')}
                    >
                        Emergency Alerts
                    </button>
                </div>

                {activeTab === 'INCIDENTS' && (
                    <>
                        {/* Filter */}
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                            <button
                                onClick={() => setFilter('ALL')}
                                className={`px-3 py-1 rounded-full text-xs font-bold ${filter === 'ALL' ? 'bg-neutral-800 text-white' : 'bg-white border text-neutral-600'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('OPEN')}
                                className={`px-3 py-1 rounded-full text-xs font-bold ${filter === 'OPEN' ? 'bg-red-100 text-red-700' : 'bg-white border text-neutral-600'}`}
                            >
                                Open
                            </button>
                            <button
                                onClick={() => setFilter('IN_PROGRESS')}
                                className={`px-3 py-1 rounded-full text-xs font-bold ${filter === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' : 'bg-white border text-neutral-600'}`}
                            >
                                In Progress
                            </button>
                            <button
                                onClick={() => setFilter('RESOLVED')}
                                className={`px-3 py-1 rounded-full text-xs font-bold ${filter === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-white border text-neutral-600'}`}
                            >
                                Resolved
                            </button>
                        </div>

                        {/* List */}
                        <div className="space-y-4">
                            {filteredIncidents.map(incident => (
                                <div key={incident.id} className="card flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-neutral-900">{incident.title}</span>
                                            <span className={`text-[10px] px-2 rounded-full font-bold ${incident.status === 'OPEN' ? 'bg-red-100 text-red-700' :
                                                incident.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                                }`}>
                                                {incident.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-neutral-600 mb-1">{incident.description}</p>
                                        <div className="text-xs text-neutral-400">
                                            Reported by {incident.userName} • {timeAgo(incident.createdAt)}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-end md:self-auto">
                                        {incident.status !== 'IN_PROGRESS' && incident.status !== 'RESOLVED' && (
                                            <Button size="sm" variant="outline" onClick={() => updateStatus(incident.id, 'IN_PROGRESS')}>
                                                Review
                                            </Button>
                                        )}
                                        {incident.status !== 'RESOLVED' && (
                                            <Button size="sm" onClick={() => updateStatus(incident.id, 'RESOLVED')}>
                                                Resolve
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'ALERTS' && (
                    <div className="card p-8 text-center bg-red-50 border-red-100">
                        <Megaphone className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-red-700 mb-2">Emergency Broadcast</h2>
                        <p className="text-red-600 mb-6">Send an immediate notification to all users on campus.</p>
                        <Button variant="danger" onClick={() => alert('Emergency Alert Sent!')}>
                            Send Emergency Alert
                        </Button>
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
};

export default AdminPanel;
