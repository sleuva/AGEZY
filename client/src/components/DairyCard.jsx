import React from 'react';
import { Milk, MapPin, IndianRupee } from 'lucide-react';

const DairyCard = ({ product }) => {
    return (
        <div className="card">
            <div style={{ height: '200px', backgroundColor: '#e0e0e0', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                ) : (
                    <Milk size={48} color="#757575" />
                )}
            </div>
            <h3>{product.name}</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>By {product.farmerName}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <MapPin size={16} />
                <span>{product.location}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>
                <IndianRupee size={16} />
                <span>{product.price} / {product.unit}</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }}>Buy Now</button>
        </div>
    );
};

export default DairyCard;
