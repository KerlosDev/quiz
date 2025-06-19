'use client';

import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (<div className="flex flex-col md:flex-row items-center justify-end w-full gap-4 p-4 relative">
        {/* Logo Section */}
        <Link href="/" className="order-1 md:order-2">
            <div className="flex place-items-center text-yellow-500 text-5xl p-3 rounded-t-2xl rounded-l-2xl">
                <img src="/check.png" className="animate-pulse" width={60} height={60} alt="Check Icon" />
                <h2 className="bg-paton bg-clip-text text-transparent bg-cover font-arabicUI2 text-6xl bg-repeat mr-2">
                    كويزاتك
                </h2>
            </div>
        </Link>


    </div>
    );
};

export default Header;
