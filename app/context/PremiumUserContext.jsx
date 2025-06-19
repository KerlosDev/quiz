'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const PremiumUserContext = createContext();

export const PremiumUserProvider = ({ children }) => {
    const [hasPremiumAccess, setHasPremiumAccess] = useState(false);

    useEffect(() => {
        // Check premium access from localStorage on mount
        const premiumAccess = localStorage.getItem('premiumAccess') === 'true';
        setHasPremiumAccess(premiumAccess);
    }, []);

    const setPremiumAccess = (value) => {
        localStorage.setItem('premiumAccess', value.toString());
        setHasPremiumAccess(value);
    };

    return (
        <PremiumUserContext.Provider value={{ hasPremiumAccess, setPremiumAccess }}>
            {children}
        </PremiumUserContext.Provider>
    );
};

export const usePremiumUser = () => {
    const context = useContext(PremiumUserContext);
    if (!context) {
        throw new Error('usePremiumUser must be used within a PremiumUserProvider');
    }
    return context;
};

export default PremiumUserContext;
