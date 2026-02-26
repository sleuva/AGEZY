import React, { useEffect, useState } from 'react';
import { getSchemes } from '../services/schemeService';
import { Bell, Calendar, ExternalLink, CheckCircle } from 'lucide-react';

const SchemeNotifier = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const data = await getSchemes();
                setSchemes(data);
            } catch (error) {
                console.error('Failed to load schemes');
            } finally {
                setLoading(false);
            }
        };
        fetchSchemes();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'No Deadline';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)' }}>Government Scheme Notifier</h1>
                <p style={{ color: 'var(--text-light)' }}>Stay updated with the latest government schemes and subsidies.</p>
            </header>

            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading schemes...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                    {schemes.length > 0 ? (
                        schemes.map(scheme => (
                            <div key={scheme._id} className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{scheme.title}</h3>
                                    <span style={{ fontSize: '0.8rem', backgroundColor: '#FFF3E0', color: 'var(--accent)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>
                                        {scheme.category}
                                    </span>
                                </div>

                                <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>{scheme.description}</p>

                                <div style={{ marginBottom: '1rem' }}>
                                    <h4 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <CheckCircle size={16} color="var(--primary)" /> Eligibility
                                    </h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{scheme.eligibility}</p>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h4 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <Calendar size={16} color="var(--accent)" /> Deadline
                                    </h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 'bold' }}>{formatDate(scheme.deadline)}</p>
                                </div>

                                {scheme.applicationLink && (
                                    <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
                                        Apply Now <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
                            <Bell size={48} style={{ marginBottom: '1rem', color: 'var(--text-light)', opacity: 0.5 }} />
                            <p>No active schemes found at the moment.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SchemeNotifier;
