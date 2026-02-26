import React, { useEffect, useState } from 'react';
import { getLabour } from '../services/labourService';
import LabourCard from '../components/LabourCard';
import { Search } from 'lucide-react';

const LabourConnect = () => {
    const [labourList, setLabourList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLabour = async () => {
            try {
                const data = await getLabour();
                setLabourList(data);
            } catch (error) {
                console.error('Failed to load labour');
            } finally {
                setLoading(false);
            }
        };
        fetchLabour();
    }, []);

    const filteredList = labourList.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)' }}>Labour Connect</h1>
                <p style={{ color: 'var(--text-light)' }}>Find skilled individual workers or seasonal groups.</p>
            </header>

            <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                <input
                    type="text"
                    placeholder="Search by name, skill, or location..."
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
                <p style={{ textAlign: 'center' }}>Loading labour profiles...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {filteredList.length > 0 ? (
                        filteredList.map(item => (
                            <LabourCard key={item._id} labour={item} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No labour profiles found matching your search.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default LabourConnect;
