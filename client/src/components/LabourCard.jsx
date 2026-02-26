import React from 'react';
import { User, Users, MapPin, Phone } from 'lucide-react';

const LabourCard = ({ labour }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    {labour.type === 'Group' ? <Users size={24} /> : <User size={24} />}
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{labour.name}</h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', backgroundColor: '#e0e0e0', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {labour.type} {labour.type === 'Group' && `(${labour.groupSize} Members)`}
                    </span>
                </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Skills:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {labour.skills.map((skill, index) => (
                        <span key={index} style={{ fontSize: '0.85rem', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <MapPin size={16} />
                <span>{labour.location}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <Phone size={16} />
                <span>{labour.contactNumber}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>
                    ₹{labour.wagePerDay} / day
                </span>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Book Now</button>
            </div>
        </div>
    );
};

export default LabourCard;
