import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIncidents } from '../context/IncidentContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import Button from '../components/Button';
import { ArrowLeft, MapPin, Clock, Shield } from 'lucide-react';
import { timeAgo } from '../utils/dateUtils';

const IncidentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getIncident, updateStatus } = useIncidents();
    const { user } = useAuth();
    const navigate = useNavigate();

    const incident = id ? getIncident(id) : undefined;

    if (!incident) {
        return (
            <div className="min-h-screen bg-app flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <p className="text-neutral-500 mb-4">Incident not found.</p>
                    <Button onClick={() => navigate('/')}>Return Home</Button>
                </div>
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-app pb-20 md:pb-0">
            <Navbar />

            <main className="container max-w-2xl py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="card">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-2xl font-bold text-neutral-900 mb-2">{incident.title}</h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
              ${incident.status === 'OPEN' ? 'bg-red-100 text-red-700' :
                                incident.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'}`}
                        >
                            {incident.status.replace('_', ' ')}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-6 border-b border-neutral-100 pb-4">
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {timeAgo(incident.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {incident.location.address}
                        </span>
                    </div>

                    <p className="text-neutral-700 leading-relaxed mb-6 whitespace-pre-wrap">
                        {incident.description}
                    </p>

                    {/* Admin Controls */}
                    {user?.role === 'ADMIN' && (
                        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                            <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-neutral-700">
                                <Shield className="w-4 h-4" />
                                Admin Actions
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <Button
                                    size="sm"
                                    variant={incident.status === 'OPEN' ? 'primary' : 'outline'}
                                    onClick={() => updateStatus(incident.id, 'OPEN')}
                                >
                                    Mark Open
                                </Button>
                                <Button
                                    size="sm"
                                    variant={incident.status === 'IN_PROGRESS' ? 'primary' : 'outline'}
                                    onClick={() => updateStatus(incident.id, 'IN_PROGRESS')}
                                >
                                    Mark In Review
                                </Button>
                                <Button
                                    size="sm"
                                    variant={incident.status === 'RESOLVED' ? 'primary' : 'outline'}
                                    onClick={() => updateStatus(incident.id, 'RESOLVED')}
                                >
                                    Mark Resolved
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default IncidentDetail;
