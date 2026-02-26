import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Farmer' });
    const [error, setError] = useState('');

    const { name, email, password, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await register({ name, email, password, role });
            navigate('/');
        } catch (err) {
            setError(err.msg || 'Registration Failed');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', padding: '4rem 1rem' }}>
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <UserPlus color="var(--primary)" /> Register
                </h2>
                {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Role</label>
                        <select
                            name="role"
                            value={role}
                            onChange={onChange}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                        >
                            <option value="Farmer">Farmer</option>
                            <option value="Labour">Labour</option>
                            <option value="Equipment Owner">Equipment Owner</option>
                            <option value="Dairy Farmer">Dairy Farmer</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Register</button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
