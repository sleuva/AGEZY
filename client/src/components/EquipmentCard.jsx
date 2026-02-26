import React from 'react';
import { Tractor, MapPin, IndianRupee } from 'lucide-react';

const EquipmentCard = ({ equipment }) => {
    return (
        <div className="card">
            <div style={{ height: '200px', backgroundColor: '#e0e0e0', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {equipment.imageUrl ? (
                    <img src={equipment.imageUrl} alt={equipment.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                ) : (
                    <Tractor size={48} color="#757575" />
                )}
            </div>
            <h3>{equipment.name}</h3>
            <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '0.5rem' }}>{equipment.type}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <MapPin size={16} />
                <span>{equipment.location}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>
                <IndianRupee size={16} />
                <span>{equipment.pricePerHour} / hr</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }}>Book Now</button>
        </div>
    );
};

export default EquipmentCard;
