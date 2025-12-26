import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import IncidentCard from '../components/IncidentCard';
import { useIncidents } from '../context/IncidentContext';
import { Search, Filter } from 'lucide-react';
import type { IncidentType } from '../types';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const { incidents } = useIncidents();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState<IncidentType | 'ALL'>('ALL');

    const filteredIncidents = incidents.filter(inc => {
        const matchesSearch = inc.title.toLowerCase().includes(search.toLowerCase()) ||
            inc.description.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === 'ALL' || inc.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-app pb-20 md:pb-0">
            <Navbar />

            <main className="container py-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-neutral-900">Incident Feed</h1>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search incidents..."
                                className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <button className="p-2 border border-neutral-200 rounded-lg bg-white text-neutral-600 hover:bg-neutral-50">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Categories / Filters Scroll */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                    {['ALL', 'HEALTH', 'SECURITY', 'ENVIRONMENT', 'LOST_FOUND', 'TECHNICAL'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type as any)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filterType === type
                                ? 'bg-primary-600 text-white'
                                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                                }`}
                        >
                            {type.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                {/* Feed Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredIncidents.map(incident => (
                        <IncidentCard
                            key={incident.id}
                            incident={incident}
                            onClick={() => navigate(`/incident/${incident.id}`)}
                        />
                    ))}
                </div>

                {filteredIncidents.length === 0 && (
                    <div className="text-center py-12 text-neutral-500">
                        <p>No incidents found.</p>
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
};

export default Home;
