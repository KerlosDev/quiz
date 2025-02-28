'use client';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from "react-icons/fa";
import { PiHeartFill } from "react-icons/pi";
import Link from 'next/link';
import { usePremiumUser } from '../context/PremiumUserContext';

const ActiveSqu = () => {
    const { user } = useUser();
    const premuserorNot = usePremiumUser();
    
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

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

    if (!isClient) {
        return null;
    }

    return (
        <div>
            <div className=" col-span-1 mt-2 hover:brightness-90 transition bg-green-500 shadow-2xl bg-non2 bg-cover h-full outline-dashed outline-offset-2  outline-green-500 p-4 md:p-9 rounded-xl flex items-center">
                {/* Noise Effect */}
                {!premuserorNot || !user ? (
                    !user ? (
                        <Link href='/sign-up'>
                            <h3 className="flex justify-items-center place-items-center flex-col font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-white cursor-pointer">
                                <FaExclamationTriangle className="text-6xl md:text-8xl transition hover:scale-150" />
                                تفعيل الحساب
                            </h3>
                        </Link>
                    ) : (
                        <Link href='/payment'>
                            <h3 className="flex flex-col  justify-items-center place-items-center  font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-white cursor-pointer">
                                <FaExclamationTriangle className="text-6xl md:text-8xl transition hover:scale-150" />
                                تفعيل الحساب
                            </h3>
                        </Link>
                    )
                ) : (
                    <h3 onClick={handleScrollToSub} className="flex flex-col font-arabicUI3 items-center justify-center text-3xl md:text-5xl text-center text-white cursor-pointer">
                        <PiHeartFill className="text-7xl md:text-8xl transition hover:scale-150 hover:cursor-pointer" />
                        الحساب اتفعل
                    </h3>
                )}
            </div>
        </div>
    );
};

export default ActiveSqu;