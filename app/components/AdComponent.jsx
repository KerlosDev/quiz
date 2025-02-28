'use client'
import React, { useEffect } from 'react';
import { usePremiumUser } from '../context/PremiumUserContext';

const AdComponent = () => {

    const premuserorNot = usePremiumUser();
    console.log(premuserorNot)
    
    if (premuserorNot) {
        return;
    }
    useEffect(() => {
        const script1 = document.createElement('script');
        script1.type = 'text/javascript';
        script1.innerHTML = `
            atOptions = {
                'key' : '60b0a91c5ffc6069248a290aa7a65edd',
                'format' : 'iframe',
                'height' : 250,
                'width' : 300,
                'params' : {}
            };
        `;
        document.getElementById('ad-container').appendChild(script1);

        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = '//www.highperformanceformat.com/60b0a91c5ffc6069248a290aa7a65edd/invoke.js';
        document.getElementById('ad-container').appendChild(script2);

        // Clean up the scripts when the component unmounts
        
    }, []);

    return (
        <div id="ad-container" className='w-40 flex justify-center m-5 mx-auto h-72'>
            {/* Ad will be injected here */}
        </div>
    );
};

export default AdComponent;
