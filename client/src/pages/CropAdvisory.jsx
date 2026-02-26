import React, { useState } from 'react';
import { getCropRecommendation } from '../services/advisoryService';
import { Sprout, CloudRain, Thermometer } from 'lucide-react';

const CropAdvisory = () => {
    const [formData, setFormData] = useState({
        location: '',
        season: 'Kharif',
        soilType: 'Alluvial'
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await getCropRecommendation(formData);
            setResult(data);
        } catch (error) {
            console.error('Failed to get recommendation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)' }}>Smart Crop Advisory</h1>
                <p style={{ color: 'var(--text-light)' }}>Get AI-driven crop recommendations for better yield.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1rem' }}>Enter Details</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location</label>
                            <input
                                type="text"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                                placeholder="e.g., Punjab, India"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Season</label>
                            <select
                                value={formData.season}
                                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                            >
                                <option value="Kharif">Kharif (Monsoon)</option>
                                <option value="Rabi">Rabi (Winter)</option>
                                <option value="Zaid">Zaid (Summer)</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Soil Type</label>
                            <select
                                value={formData.soilType}
                                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                            >
                                <option value="Alluvial">Alluvial Soil</option>
                                <option value="Black">Black Soil</option>
                                <option value="Red">Red Soil</option>
                                <option value="Laterite">Laterite Soil</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Analyzing...' : 'Get Recommendation'}
                        </button>
                    </form>
                </div>

                <div>
                    {result ? (
                        <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Sprout size={24} color="var(--primary)" />
                                Recommended Crops
                            </h3>
                            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {result.recommendations.map((rec, index) => (
                                    <div key={index} style={{ padding: '1rem', backgroundColor: 'var(--bg)', borderRadius: 'var(--radius-md)' }}>
                                        <h4 style={{ margin: 0, color: 'var(--primary)' }}>{rec.crop}</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>{rec.reason}</p>
                                        <span style={{
                                            display: 'inline-block',
                                            marginTop: '0.5rem',
                                            fontSize: '0.8rem',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            backgroundColor: rec.suitability === 'High' ? 'var(--primary-light)' : '#FFCC80',
                                            color: rec.suitability === 'High' ? 'white' : 'var(--dark)'
                                        }}>
                                            {rec.suitability} Suitability
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
                            <CloudRain size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>Enter your farm details to get personalized crop suggestions.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CropAdvisory;
