import React from 'react';
import type { Incident } from '../types';
import { MapPin, Clock, ThumbsUp } from 'lucide-react';
import { timeAgo } from '../utils/dateUtils';

interface IncidentCardProps {
    incident: Incident;
    onClick?: () => void;
}

const statusColors = {
    OPEN: 'bg-red-100 text-red-700',
    IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
    RESOLVED: 'bg-green-100 text-green-700',
};

const typeIcons = {
    HEALTH: '🚑',
    SECURITY: '👮',
    ENVIRONMENT: '🌳',
    LOST_FOUND: '🔍',
    TECHNICAL: '🔧',
};

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onClick }) => {
    return (
        <div
            className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={onClick}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{typeIcons[incident.type]}</span>
                    <div>
                        <h3 className="font-semibold text-neutral-900 line-clamp-1">{incident.title}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[incident.status]}`}>
                            {incident.status.replace('_', ' ')}
                        </span>
                    </div>
                </div>
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {timeAgo(incident.createdAt)}
                </span>
            </div>

            <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                {incident.description}
            </p>

            <div className="flex items-center justify-between text-xs text-neutral-500">
                <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-[150px]">{incident.location.address || 'Unknown Location'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{incident.votes}</span>
                </div>
            </div>
        </div>
    );
};

export default IncidentCard;
