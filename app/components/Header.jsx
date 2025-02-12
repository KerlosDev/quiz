'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';

const Header = () => {
    const { user, isLoaded } = useUser(); // Clerk hook to get the current user
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    // Ensure client-side rendering
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSignUp = () => {
        router.push('/sign-up');
    };
    const handleSignIn = () => {
        router.push('/sign-in');
    };

    if (!isClient || !isLoaded) {
        // Render nothing or a loading state until hydration is complete
        return null;
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 relative">
            {/* Background blur effect */}

            
            {/* Logo Section */}
            <Link href="/" className="order-1 md:order-2">
                <div className="flex place-items-center text-yellow-500 text-5xl p-3 rounded-t-2xl rounded-l-2xl">
                    <img src="/check.png" className="animate-pulse" width={60} height={60} alt="Check Icon" />
                    <h2 className="bg-paton bg-clip-text text-transparent bg-cover font-arabicUI2 text-6xl bg-repeat">
                        كويزاتك
                    </h2>
                </div>
            </Link>

            {/* User Section */}
            <div className="flex items-center gap-4 order-2 md:order-1">
                {/* Profile Icon */}
                <Link href="/subscriptions" className="flex items-center">
                    <img
                        className="h-16 w-16 object-cover" // Ensure consistent size
                        src="/profile.png"
                        alt="Profile Logo"
                    />
                </Link>

                {/* Authentication Buttons */}
                {user ? (
                    <div className="flex items-center scale-150 ml-3 mt-6 gap-4">
                        <div className="scale-150">
                            <UserButton />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-5">
                        {/* Sign In Button */}
                        <div className="flex items-center bg-non bg-cover bg-red-500 text-xl md:text-2xl p-2 h-16 rounded-xl text-white font-arabicUI shadow-xl shadow-red-600/40 outline-dashed outline-red-500 outline-offset-4">
                            <button onClick={handleSignIn}>تسجيل الدخول</button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 448 512">
                                <path
                                    fill="#fff"
                                    d="M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256m-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16s7.2-16 16-16v-24c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-40c0-29.8 20.4-54.9 48-62v-57.1q-9-.9-18.3-.9h-91.4q-9.3 0-18.3.9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7zM144 448a24 24 0 1 0 0-48a24 24 0 1 0 0 48"
                                />
                            </svg>
                        </div>
                        {/* Sign Up Button */}
                        <div className="flex items-center bg-non3 bg-cover bg-blue-500 text-xl md:text-2xl px-4 py-2 h-16 rounded-xl text-white font-arabicUI shadow-xl shadow-blue-600/40 outline-dashed outline-blue-700 outline-offset-4">
                            <button onClick={handleSignUp}>انشاء حساب</button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 36 36"
                            >
                                <path
                                    fill="#fff"
                                    d="M32.16 19.63A5.55 5.55 0 0 0 27.42 17H10.06a4.36 4.36 0 0 1-3.67-2a4.07 4.07 0 0 1-.19-4.13l3.62-7l1.42 1.63l-2.74 5.3l8.84-5.66a.91.91 0 0 1 1 1.53l-10.5 6.71a2 2 0 0 0 .24.52a2.28 2.28 0 0 0 1.65 1l8.38-5.4a.91.91 0 0 1 1 1.52L13 14.94h7.8l2.41-4.82a5.6 5.6 0 0 0-5-8.12H9a1 1 0 0 0-.9.56l-4.22 8.33a5.6 5.6 0 0 0 5 8.12h7.65l-3.43 6.87a5.6 5.6 0 0 0 5 8.12h9.28a1 1 0 0 0 .93-.65l4.14-8.24a5.58 5.58 0 0 0-.29-5.48m-14.41 5.94a.91.91 0 0 1 .25-1.26l6-3.88A.91.91 0 1 1 25 22l-6 3.88a.91.91 0 0 1-1.26-.27ZM29 24.34l-9 5.78a.91.91 0 1 1-1-1.53l9-5.78a.91.91 0 1 1 1 1.53"
                                />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
