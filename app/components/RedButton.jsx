import React from 'react';

const RedButton = ({ title, number, handleClick,font = "font-arabicUI2" }) => {
    return (
        <div
            onClick={() => handleClick(title, number)}
            className={`hover:scale-110 m-4  h-40 place-items-center justify-center bg-opacity-50 text-white text-2xl sm:text-3xl lg:text-4xl ${font} transition duration-300 bg-non bg-cover gap-2 py-5 rounded-xl cursor-pointer`}
        >
            <span className="m-auto flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24">
                    <mask id="lineMdSpeedTwotoneLoop0">
                        <path
                            fill="#fff"
                            fillOpacity={0}
                            stroke="#fff"
                            strokeDasharray={56}
                            strokeDashoffset={56}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 19v0c-0.3 0 -0.59 -0.15 -0.74 -0.41c-0.8 -1.34 -1.26 -2.91 -1.26 -4.59c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 1.68 -0.46 3.25 -1.26 4.59c-0.15 0.26 -0.44 0.41 -0.74 0.41Z">
                            <animate fill="freeze" attributeName="fill-opacity" begin="0.3s" dur="0.15s" values="0;0.3"></animate>
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0"></animate>
                        </path>
                        <g transform="rotate(-100 12 14)">
                            <path d="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z">
                                <animate fill="freeze" attributeName="d" begin="0.4s" dur="0.2s" values="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z;M16 14C16 16.21 14.21 18 12 18C9.79 18 8 16.21 8 14C8 11.79 12 0 12 0C12 0 16 11.79 16 14Z"></animate>
                            </path>
                            <path fill="#fff" d="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z">
                                <animate fill="freeze" attributeName="d" begin="0.4s" dur="0.2s" values="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z;M14 14C14 15.1 13.1 16 12 16C10.9 16 10 15.1 10 14C10 12.9 12 4 12 4C12 4 14 12.9 14 14Z"></animate>
                            </path>
                            <animateTransform attributeName="transform" begin="0.4s" dur="6s" repeatCount="indefinite" type="rotate" values="-100 12 14;45 12 14;45 12 14;45 12 14;20 12 14;10 12 14;0 12 14;35 12 14;45 12 14;55 12 14;50 12 14;15 12 14;-20 12 14;-100 12 14"></animateTransform>
                        </g>
                    </mask>
                    <rect width={24} height={24} fill="#fff" mask="url(#lineMdSpeedTwotoneLoop0)"></rect>
                </svg>
            </span>
            <span className="text-4xl">{title}</span>
        </div>
    );
};

export default RedButton;