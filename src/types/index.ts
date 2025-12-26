export type UserRole = 'USER' | 'ADMIN';

export type IncidentStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';

export type IncidentType = 'HEALTH' | 'SECURITY' | 'ENVIRONMENT' | 'LOST_FOUND' | 'TECHNICAL';

export interface Location {
    lat: number;
    lng: number;
    address?: string;
}

export interface Incident {
    id: string;
    title: string;
    description: string;
    type: IncidentType;
    status: IncidentStatus;
    location: Location;
    createdAt: string; // ISO Date string
    userId: string;
    userName: string;
    imageUrl?: string;
    votes: number;
}
