'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import GlobalApi from '../api/GlobalApi';
import { useUser } from '@clerk/nextjs';

const PremiumUserContext = createContext();

export const PremiumUserProvider = ({ children }) => {
    const { user } = useUser();
    const [premuserorNot, setPremUser] = useState(false);

    useEffect(() => {
        const storedPremStatus = localStorage.getItem("premuserorNot");
        if (storedPremStatus) {
            setPremUser(JSON.parse(storedPremStatus));
        } else if (user?.primaryEmailAddress?.emailAddress) {
            premiumusers(user?.primaryEmailAddress?.emailAddress);
        }
    }, [user]);

    const premiumusers = async (email) => {
        try {
            const res = await GlobalApi.premUsers(email);
            if (res && res.premiumUsersReqs && res.premiumUsersReqs.length > 0 && res.premiumUsersReqs[0]) {
                const isPremium = res.premiumUsersReqs[0].isHePaid;
                setPremUser(isPremium);
                localStorage.setItem("premuserorNot", JSON.stringify(isPremium));
            } else {
                setPremUser(false);
            }
        } catch (error) {
            console.error("Error fetching premium user status:", error);
        }
    };

    return (
        <PremiumUserContext.Provider value={premuserorNot}>
            {children}
        </PremiumUserContext.Provider>
    );
};

export const usePremiumUser = () => useContext(PremiumUserContext);
