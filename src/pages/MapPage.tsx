// @ts-nocheck
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { useIncidents } from '../context/IncidentContext';
import L from 'leaflet';
import iconMarker2x from 'leaflet/dist/images/marker-icon-2x.png';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconMarker2x,
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
});

const MapPage: React.FC = () => {
    const { incidents } = useIncidents();
    const navigate = useNavigate();

    // Fix icon cleanup if needed (idempotent due to global mergeOptions above)

    // Default center (Istanbul/Campus Mock)
    const center: [number, number] = [41.0082, 28.9784];

    return (
        <div className="h-screen flex flex-col bg-app">
            <Navbar />

            <div className="flex-1 relative z-0">
                {/* @ts-ignore */}
                <MapContainer center={center} zoom={16} style={{ height: '100%', width: '100%' }}>
                    {/* @ts-ignore */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {incidents.map((incident) => (
                        <Marker
                            key={incident.id}
                            position={[incident.location.lat, incident.location.lng]}
                        >
                            <Popup>
                                <div onClick={() => navigate(`/incident/${incident.id}`)} className="cursor-pointer min-w-[200px]">
                                    <h3 className="font-bold text-sm mb-1">{incident.title}</h3>
                                    <p className="text-xs text-neutral-500 mb-2 truncate">{incident.description}</p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${incident.status === 'OPEN' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                        {incident.status}
                                    </span>
                                    <p className="text-xs text-blue-600 mt-2 font-medium">Click to view details</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <BottomNav />
        </div>
    );
};

export default MapPage;
