import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import Input from '../components/Input';
import Button from '../components/Button';
import { useIncidents } from '../context/IncidentContext';
import { useAuth } from '../context/AuthContext';
import type { IncidentType } from '../types';
import { Camera } from 'lucide-react';

const incidentTypes: { value: IncidentType; label: string; icon: string }[] = [
    { value: 'HEALTH', label: 'Health Emergency', icon: '🚑' },
    { value: 'SECURITY', label: 'Security Issue', icon: '👮' },
    { value: 'ENVIRONMENT', label: 'Environmental', icon: '🌳' },
    { value: 'LOST_FOUND', label: 'Lost & Found', icon: '🔍' },
    { value: 'TECHNICAL', label: 'Technical Issue', icon: '🔧' },
];

const CreateIncident: React.FC = () => {
    const navigate = useNavigate();
    const { addIncident } = useIncidents();
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<IncidentType>('TECHNICAL');
    const [locationText, setLocationText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !locationText) return;

        setIsSubmitting(true);

        // Simulate API delay
        setTimeout(() => {
            addIncident({
                title,
                description,
                type,
                userId: user?.id || 'anonymous',
                userName: user?.name || 'Anonymous',
                location: {
                    lat: 41.0082, // Mock coords
                    lng: 28.9784,
                    address: locationText
                }
            });
            setIsSubmitting(false);
            navigate('/');
        }, 800);
    };

    return (
        <div className="min-h-screen bg-app pb-20 md:pb-0">
            <Navbar />

            <main className="container max-w-2xl py-6">
                <h1 className="text-2xl font-bold mb-6 text-neutral-900">Report an Incident</h1>

                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-muted mb-2">Category</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {incidentTypes.map((t) => (
                                    <button
                                        key={t.value}
                                        type="button"
                                        onClick={() => setType(t.value)}
                                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${type === t.value
                                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                                            : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                                            }`}
                                    >
                                        <span className="text-2xl mb-1">{t.icon}</span>
                                        <span className="text-xs font-medium">{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Input
                            label="Title"
                            placeholder="e.g., Broken Light in Corridor"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <div className="mb-4">
                            <label className="text-sm font-medium text-muted mb-2 block">Description</label>
                            <textarea
                                className="w-full p-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px]"
                                placeholder="Describe what happened..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <Input
                            label="Location"
                            placeholder="e.g., Engineering Building, 2nd Floor"
                            value={locationText}
                            onChange={(e) => setLocationText(e.target.value)}
                            required
                        />

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-muted mb-2">Photo (Optional)</label>
                            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 flex flex-col items-center justify-center text-neutral-500 hover:bg-neutral-50 cursor-pointer transition-colors">
                                <Camera className="w-8 h-8 mb-2" />
                                <span className="text-sm">Tap to take a photo</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                className="flex-1"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Report'}
                            </Button>
                        </div>
                    </form>
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default CreateIncident;
