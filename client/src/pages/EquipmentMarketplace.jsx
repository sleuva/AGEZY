import React, { useEffect, useState } from 'react';
import { getEquipment } from '../services/equipmentService';
import EquipmentCard from '../components/EquipmentCard';
import { Search } from 'lucide-react';

const EquipmentMarketplace = () => {
    const [equipmentList, setEquipmentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const data = await getEquipment();
                setEquipmentList(data);
            } catch (error) {
                console.error('Failed to load equipment');
            } finally {
                setLoading(false);
            }
        };
        fetchEquipment();
    }, []);

    const filteredList = equipmentList.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)' }}>Equipment Rental Marketplace</h1>
                <p style={{ color: 'var(--text-light)' }}>Find tractors, harvesters, and more near you.</p>
            </header>

            <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                <input
                    type="text"
                    placeholder="Search by name, type, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border)',
                        fontSize: '1rem',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                />
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>

            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading equipment...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {filteredList.length > 0 ? (
                        filteredList.map(item => (
                            <EquipmentCard key={item._id} equipment={item} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No equipment found matching your search.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EquipmentMarketplace;
