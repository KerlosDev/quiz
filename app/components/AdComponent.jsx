import React, { useEffect } from 'react';

const AdComponent = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
            atOptions = {
                'key' : 'b13c7df0a00e4233831ce74ddb728656',
                'format' : 'iframe',
                'height' : 300,
                'width' : 160,
                'params' : {}
            };
        `;
        document.body.appendChild(script);

        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = '//www.highperformanceformat.com/b13c7df0a00e4233831ce74ddb728656/invoke.js';
        document.body.appendChild(invokeScript);

        return () => {
            document.body.removeChild(script);
            document.body.removeChild(invokeScript);
        };
    }, []);

    return (
        <div id="ad-container" style={{ width: '160px', height: '300px' }}>
            {/* Ad will be injected here */}
        </div>
    );
};

export default AdComponent;
