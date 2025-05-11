import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import './ProtecteRoute.scss';

const ProtectedRoute = ({ children }) => {
    const { t } = useTranslation();

    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('authData'));
        if (authData && new Date().getTime() < authData.expirationTime) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            localStorage.removeItem('authData');
        }
    }, []);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/lock', { pin: password });

            if (response.status === 200) {
                setIsAuthenticated(true);
                setError('');
                
                
                const expirationTime = new Date().getTime() + 3600000;
                const authData = { pin: password, expirationTime };
                localStorage.setItem('authData', JSON.stringify(authData));
            }
        } catch (error) {
            setError('Mot de passe incorrect');
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated) {
        return children;  
    }

    return (
        <form onSubmit={handlePasswordSubmit} className='form-password'>
            <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder={`${t('Entrer mot de passe')}`} 
                className='form-password-input'
                required
            />
            {error && <div className="error">{error}</div>}
            <button type="submit" className='form-password-button'>
                {loading ? `${t('Chargement...')}` : t('Envoyer')}
            </button>
        </form>
    );
};

export default ProtectedRoute;