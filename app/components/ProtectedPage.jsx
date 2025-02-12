'use client'
import React, { useState, useEffect } from 'react';
import People from './People';

const ProtectedPage = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedPassword = localStorage.getItem('pagePassword');
        if (savedPassword === '1357924680') {
            setIsAuthenticated(true);
        }
    }, []);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordSubmit = () => {
        if (password === '1357924680') {
            localStorage.setItem('pagePassword', password);
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    if (isAuthenticated) {
        return <People />;
    }

    return (
        <div className='flex justify-center'>
            <div className='bg-paton  bg-cover p-5 rounded-xl'>
                <h2 className='text-4xl text-white mb-4 font-arabicUI3'>اكتب الباسورد</h2>
                <input
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    className='p-2 rounded'
                />
                <button onClick={handlePasswordSubmit} className='ml-2 p-2 bg-blue-500 font-arabicUI3 text-white rounded'>
                     دخول
                </button>
            </div>
        </div>
    );
};

export default ProtectedPage;
