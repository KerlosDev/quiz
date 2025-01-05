'use client';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from "react-icons/fa";
import GlobalApi from '../api/GlobalApi';
import { PiHeartFill } from "react-icons/pi";
import Link from 'next/link';

const ActiveSqu = () => {
    const { user } = useUser();
    const [premuserorNot, setPremUser] = useState(false);

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            premiumusers(user?.primaryEmailAddress?.emailAddress);
        }
    }, [user]);

    const premiumusers = async (email) => {
        try {
            const res = await GlobalApi.premUsers(email);
            // Log the full response for debugging purposes
            console.log(res);

            // Check if response contains valid data
            if (res && res.userEnrolls && res.userEnrolls[0]) {
                setPremUser(res.userEnrolls[0].isHePaid);
            } else {

                setPremUser(false); // Mark as not paid
            }
        } catch (error) {

            setPremUser(false); // Mark as not paid
        }
    };

    const handleScrollToSub = () => {
        const targetElement = document.getElementById('subs');
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.error("Element with id 'subs' not found.");
        }
    };

    return (
        <div className="relative col-span-1 bg-yellow-400 shadow-2xl bg-non2 bg-cover outline-dashed outline-offset-2 outline-green-500 w-fit p-4 md:p-9 rounded-xl flex items-center">
            {/* Noise Effect */}
            <div className="absolute pointer-events-none h-full w-full opacity-5 bg-noise z-50"></div>

            {!premuserorNot || !user ? (
                <Link href='/payment'>
                    <h3
                        className="flex flex-col md:flex-row font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-white cursor-pointer"
                    // Trigger scroll when clicked
                    >
                        <FaExclamationTriangle className="text-6xl md:text-8xl transition hover:scale-150" />
                        تفعيل الحساب
                    </h3>
                </Link>
            ) : (
                <h3 onClick={handleScrollToSub} className="flex flex-col md:flex-row font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-white cursor-pointer">
                    <PiHeartFill className="text-6xl md:text-8xl transition hover:scale-150 hover:cursor-pointer" />
                    الحساب اتفعل
                </h3>
            )}
        </div>
    );
};

export default ActiveSqu;
