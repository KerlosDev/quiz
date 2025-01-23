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
    const [isClient, setIsClient] = useState(false); // Ensure client-side rendering

    useEffect(() => {
        // Mark that we're running on the client side
        setIsClient(true);

        if (user?.primaryEmailAddress?.emailAddress) {
            // Fetch premium status if the user is logged in
            premiumusers(user.primaryEmailAddress.emailAddress);
        } else {
            // Reset premium status if the user is not logged in
            setPremUser(false);
        }
    }, [user]);

    const premiumusers = async (email) => {
        try {
            const res = await GlobalApi.premUsers(email);

            console.log(res)

            if (res && res.premiumUsersReqs && res.premiumUsersReqs.length > 0 && res.premiumUsersReqs[0]) {
                const isPremium = res.premiumUsersReqs[0].isHePaid;
                setPremUser(isPremium);

                // Store the premium status in localStorage
                localStorage.setItem("premuserorNot", JSON.stringify(isPremium));
            } else {
                console.warn("No enrollment data found for the user.");
                setPremUser(false); // Default to not premium if no data
            }
        } catch (error) {
            console.error("Error fetching premium user status:", error);
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

    // Render only on the client side
    if (!isClient) {
        return null; // Prevent server-side mismatch
    }

    return (
        <div>
            <div className=" col-span-1 mt-2 hover:brightness-90 transition bg-green-500 shadow-2xl bg-non2 bg-cover h-full outline-dashed outline-offset-2  outline-green-500 p-4 md:p-9 rounded-xl flex items-center">
                {/* Noise Effect */}

                
                {!premuserorNot || !user ? (
                    !user ? (
                        <Link href='/sign-up'>
                            <h3
                                className="flex justify-items-center place-items-center flex-col font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-white cursor-pointer"
                            >
                                <FaExclamationTriangle className="text-6xl md:text-8xl transition hover:scale-150" />
                                تفعيل الحساب
                            </h3>
                        </Link>
                    ) : (
                        <Link href='/payment'>
                            <h3
                                className="flex flex-col  justify-items-center place-items-center  font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-white cursor-pointer"
                            >
                                <FaExclamationTriangle className="text-6xl md:text-8xl transition hover:scale-150" />
                                تفعيل الحساب
                            </h3>
                        </Link>
                    )
                ) : (
                    <h3
                        onClick={handleScrollToSub}
                        className="flex flex-col    font-arabicUI3 items-center justify-center text-3xl md:text-5xl  text-center text-white cursor-pointer"
                    >
                        <PiHeartFill className="text-7xl md:text-8xl transition hover:scale-150 hover:cursor-pointer" />
                        الحساب اتفعل
                    </h3>
                )}
            </div>
        </div>
    );
};

export default ActiveSqu;
