import React, { useEffect, useState } from 'react';
import { getGuides } from '../services/guideService';
import { BookOpen, Video, ArrowRight } from 'lucide-react';

const LearningHub = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const data = await getGuides();
                setGuides(data);
            } catch (error) {
                console.error('Failed to load guides');
            } finally {
                setLoading(false);
            }
        };
        fetchGuides();
    }, []);

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)' }}>Agri-Tech Learning Hub</h1>
                <p style={{ color: 'var(--text-light)' }}>Learn about modern farming tools and practices.</p>
            </header>

            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading guides...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {guides.length > 0 ? (
                        guides.map(guide => (
                            <div key={guide._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                {guide.imageUrl && (
                                    <img
                                        src={guide.imageUrl}
                                        alt={guide.title}
                                        style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}
                                    />
                                )}
                                <span style={{
                                    alignSelf: 'flex-start',
                                    fontSize: '0.8rem',
                                    color: 'var(--primary)',
                                    backgroundColor: 'var(--primary-light)',
                                    color: 'white',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '4px',
                                    marginBottom: '0.5rem'
                                }}>
                                    {guide.category}
                                </span>
                                <h3 style={{ marginBottom: '0.5rem' }}>{guide.title}</h3>
                                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
                                    {guide.content.substring(0, 100)}...
                                </p>

                                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                    {guide.videoUrl && (
                                        <a href={guide.videoUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '0.5rem', border: '1px solid var(--border)', color: 'var(--text)' }}>
                                            <Video size={18} />
                                        </a>
                                    )}
                                    <button className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }}>
                                        Read More <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)' }}>
                            <BookOpen size={48} style={{ marginBottom: '1rem', color: 'var(--text-light)', opacity: 0.5 }} />
                            <p>No guides available yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LearningHub;
