import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Incident, IncidentStatus } from '../types';
//kütüphane eklenecek.
interface IncidentContextType {
    incidents: Incident[];
    addIncident: (incident: Omit<Incident, 'id' | 'createdAt' | 'status' | 'votes'>) => void;
    updateStatus: (id: string, status: IncidentStatus) => void;
    getIncident: (id: string) => Incident | undefined;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

const MOCK_INCIDENTS: Incident[] = [
    {
        id: '1',
        title: 'Broken Elevator in Block A',
        description: 'The elevator in the main engineering building has been stuck on the 2nd floor since morning.',
        type: 'TECHNICAL',
        status: 'OPEN',
        location: { lat: 41.0082, lng: 28.9784, address: 'Engineering Block A' },
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        userId: 'u1',
        userName: 'John Student',
        votes: 5
    },
    {
        id: '2',
        title: 'Lost Wallet',
        description: 'Black leather wallet lost near the cafeteria. Contains ID.',
        type: 'LOST_FOUND',
        status: 'OPEN',
        location: { lat: 41.0085, lng: 28.9790, address: 'Central Cafeteria' },
        createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        userId: 'u2',
        userName: 'Jane Doe',
        votes: 2
    },
    {
        id: '3',
        title: 'Slippery Stairs',
        description: 'Stairs near the library entrance are very slippery due to rain.',
        type: 'SECURITY',
        status: 'RESOLVED',
        location: { lat: 41.0090, lng: 28.9780, address: 'Library Entrance' },
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        userId: 'u3',
        userName: 'Mike Guard',
        votes: 12
    }
];

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [incidents, setIncidents] = useState<Incident[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('incidents');
        if (stored) {
            try {
                setIncidents(JSON.parse(stored));
            } catch (error) {
                console.error('Failed to parse incidents data:', error);
                localStorage.removeItem('incidents');
                setIncidents(MOCK_INCIDENTS);
            }
        } else {
            setIncidents(MOCK_INCIDENTS);
            localStorage.setItem('incidents', JSON.stringify(MOCK_INCIDENTS));
        }
    }, []);

    const addIncident = (data: Omit<Incident, 'id' | 'createdAt' | 'status' | 'votes'>) => {
        const newIncident: Incident = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            status: 'OPEN',
            votes: 0
        };
        const updated = [newIncident, ...incidents];
        setIncidents(updated);
        localStorage.setItem('incidents', JSON.stringify(updated));
    };

    const updateStatus = (id: string, status: IncidentStatus) => {
        const updated = incidents.map(inc =>
            inc.id === id ? { ...inc, status } : inc
        );
        setIncidents(updated);
        localStorage.setItem('incidents', JSON.stringify(updated));
    };

    const getIncident = (id: string) => incidents.find(i => i.id === id);

    return (
        <IncidentContext.Provider value={{ incidents, addIncident, updateStatus, getIncident }}>
            {children}
        </IncidentContext.Provider>
    );
};

export const useIncidents = () => {
    const context = useContext(IncidentContext);
    if (context === undefined) {
        throw new Error('useIncidents must be used within an IncidentProvider');
    }
    return context;
};
