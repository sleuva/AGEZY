import React, { useEffect, useState } from 'react';
import { getDairyProducts } from '../services/dairyService';
import DairyCard from '../components/DairyCard';
import { Search } from 'lucide-react';

const DairyMarketplace = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getDairyProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to load dairy products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredList = products.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--primary)' }}>Fresh Dairy Marketplace</h1>
                <p style={{ color: 'var(--text-light)' }}>Buy fresh milk, ghee, and more directly from farmers.</p>
            </header>

            <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                <input
                    type="text"
                    placeholder="Search for milk, ghee, or farmer..."
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
                <p style={{ textAlign: 'center' }}>Loading dairy products...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {filteredList.length > 0 ? (
                        filteredList.map(item => (
                            <DairyCard key={item._id} product={item} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No products found matching your search.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DairyMarketplace;
