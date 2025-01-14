'use client';
import Image from 'next/image';
import GlobalApi from '../api/GlobalApi';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsPatchCheckFill } from "react-icons/bs";
import { useUser } from '@clerk/nextjs';
import { FaLock } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const Physics = () => {
    const [activeBook, setActiveBook] = useState(false);
    const [title, setTitle] = useState('فيزياء');
    const [dataBook, setDataBook] = useState([]);
    const [numbook, setNumBook] = useState(0);
    const [numberofquiz, setNumberQuiz] = useState(0);

    const { user } = useUser();
    const [premuserorNot, setPremUser] = useState(false);

    useEffect(() => {
        // Check if the premium status is already stored
        const storedPremStatus = localStorage.getItem("premuserorNot");
        if (storedPremStatus) {
            setPremUser(JSON.parse(storedPremStatus));
        } else if (user?.primaryEmailAddress?.emailAddress) {
            // Fetch premium status if not stored
            premiumusers(user?.primaryEmailAddress?.emailAddress);
        }
    }, [user]);

    const premiumusers = async (email) => {
        try {
            const res = await GlobalApi.premUsers(email);

            if (res && res.userEnrolls && res.userEnrolls.length > 0 && res.userEnrolls[0]) {
                const isPremium = res.userEnrolls[0].isHePaid;
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

    console.log("prem", premuserorNot);

    // Handle click dynamically
    const handleClick = (namebook, index) => {
        setActiveBook(true);
        setTitle(namebook);
        setNumBook(index);

        // Scroll to top when the button is clicked
        window.scroll({ top: 0, behavior: 'smooth' });
    };

    // Fetch data on component mount
    useEffect(() => {
        physics_Data("ph");
    }, []);

    const physics_Data = () => {
        GlobalApi.physicsData("ph")
            .then((res) => {
                console.log("Response: ", res);
                setDataBook(res.dataOfQuizs);
                setNumberQuiz(res.dataOfQuizs.length);
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    };

    console.log("Number of quizzes:", numberofquiz);

    // Function to filter and render quizzes based on numbook
    const renderQuizzes = () => {
        let filterKey = '';
        if (numbook === 1) filterKey = 'hard';
        if (numbook === 2) filterKey = 'med';

        return dataBook
            ?.filter((item) => item.level === filterKey)
            ?.map((item, index) => {
                const quizLink = !user
                    ? "/sign-up" // If no user is logged in, redirect to the sign-up page
                    : (premuserorNot || index < 2
                        ? `/phys/${item.id}` // If the user is premium or it's one of the first two exams, allow access
                        : `/payment`);
                return (
                    <Link key={item.id} href={quizLink}>
                        <h4 className='hover:scale-105   justify-between rtl bg-paton bg-cover text-center cursor-pointer transition w-full sm:w-11/12 md:w-10/12 lg:w-9/12 text-xl sm:text-2xl md:text-3xl lg:text-3xl font-arabicUI2 bg-yellow-400 text-yellow-800 p-3 rounded-xl m-3 mx-auto  flex'>
                            {item?.namequiz || 'No Title Available'}

                            {index > 1 ? (
                                premuserorNot ? (
                                    <FaPlay className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                                ) : (
                                    <FaLock className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                                )
                            ) : (
                                <FaPlay className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                            )}

                        </h4>
                    </Link>
                );
            });
    };

    return (
        <div className='mx-4 sm:mx-8 lg:mx-20 grid grid-cols-1 lg:grid-cols-4 gap-6'>

            {/* Book Info Section */}
            <div
                className={`h-fit col-span-1 lg:col-span-2 mt-8 lg:m-10 p-5 md:p-7 bg-paton bg-cover rounded-xl shadow-2xl shadow-yellow-400/40 bg-yellow-400 ${activeBook && 'lg:col-span-2'}`}
            >
                <Image
                    width={200}
                    height={200}
                    className='items-center flex justify-center m-auto'
                    alt='ph'
                    src='/ph.png'
                />
                <h3 className='font-arabicUI3 text-center drop-shadow-2xl text-yellow-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
                    {title}
                </h3>

                <div className='bg-yellow-800 cursor-default shadow-xl shadow-yellow-800/50 rounded-xl m-4 p-4'>
                    <h4 className='text-2xl sm:text-4xl md:text-5xl text-center  font-arabicUI2 bg-paton text-transparent bg-clip-text m-auto justify-center flex'>
                        {title === 'فيزياء' ? 'يلا اختار كتاب تحله' : 'امتحانات الكتاب'}
                    </h4>

                    {title === 'فيزياء' && <div>
                        <h4 className='font-arabicUI3 my-3 gap-2 rtl mx-auto mt-4 mb-2 justify-center text-center flex text-4xl text-yellow-800 bg-paton bg-cover p-4 rounded-xl'>
                            عافر حلمك يستاهل
                        </h4>
                    </div>}

                    {/* Render quizzes dynamically */}
                    {renderQuizzes()}
                </div>
            </div>

            {/* Books Grid Section */}


            <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-2 h-fit gap-6 lg:col-span-2">
                <div
                    onClick={() => handleClick(' اسئلة صعبة', 1)}
                    className="hover:scale-110 m-4 font-arabicUI2 h-40 place-items-center justify-center bg-opacity-50 text-white text-2xl sm:text-3xl lg:text-4xl font-bold transition duration-300 bg-non bg-cover gap-2 p-5 rounded-xl cursor-pointer"
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
                                    <path d="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z">
                                        <animate fill="freeze" attributeName="d" begin="0.4s" dur="0.2s" values="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z;M16 14C16 16.21 14.21 18 12 18C9.79 18 8 16.21 8 14C8 11.79 12 0 12 0C12 0 16 11.79 16 14Z"></animate>
                                    </path>
                                    <path fill="#fff" d="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z">
                                        <animate fill="freeze" attributeName="d" begin="0.4s" dur="0.2s" values="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z;M14 14C14 15.1 13.1 16 12 16C10.9 16 10 15.1 10 14C10 12.9 12 4 12 4C12 4 14 12.9 14 14Z"></animate>
                                    </path>
                                    <animateTransform attributeName="transform" begin="0.4s" dur="6s" repeatCount="indefinite" type="rotate" values="-100 12 14;45 12 14;45 12 14;45 12 14;20 12 14;10 12 14;0 12 14;35 12 14;45 12 14;55 12 14;50 12 14;15 12 14;-20 12 14;-100 12 14"></animateTransform>
                                </g>
                            </mask>
                            <rect width={24} height={24} fill="#fff" mask="url(#lineMdSpeedTwotoneLoop0)"></rect>
                        </svg>        </span>
                    <span className="text-5xl">صعب</span>
                </div>

                <div
                    onClick={() => handleClick(' اسئلة متوسطة', 2)}
                    className="hover:scale-110 m-4 font-arabicUI2 h-40 place-items-center justify-center bg-opacity-50 text-white text-2xl sm:text-3xl lg:text-4xl font-bold transition duration-300 bg-non5 bg-cover gap-2 p-5 rounded-xl cursor-pointer"
                >
                    <span className="m-auto flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24">
                            <mask id="lineMdSpeedTwotoneLoop0">
                                <path fill="#fff" fillOpacity={0} stroke="#fff" strokeDasharray={56} strokeDashoffset={56} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19v0c-0.3 0 -0.59 -0.15 -0.74 -0.41c-0.8 -1.34 -1.26 -2.91 -1.26 -4.59c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 1.68 -0.46 3.25 -1.26 4.59c-0.15 0.26 -0.44 0.41 -0.74 0.41Z">
                                    <animate fill="freeze" attributeName="fill-opacity" begin="0.3s" dur="0.15s" values="0;0.3"></animate>
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0"></animate>
                                </path>
                                <g transform="rotate(-100 12 14)">
                                    <path d="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z">
                                        <animate fill="freeze" attributeName="d" begin="0.4s" dur="0.2s" values="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z;M16 14C16 16.21 14.21 18 12 18C9.79 18 8 16.21 8 14C8 11.79 12 0 12 0C12 0 16 11.79 16 14Z"></animate>
                                    </path>
                                    <path fill="#fff" d="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z">
                                        <animate fill="freeze" attributeName="d" begin="0.4s" dur="0.2s" values="M12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14C12 14 12 14 12 14Z;M14 14C14 15.1 13.1 16 12 16C10.9 16 10 15.1 10 14C10 12.9 12 4 12 4C12 4 14 12.9 14 14Z"></animate>
                                    </path>
                                    <animateTransform attributeName="transform" begin="0.4s" dur="6s" repeatCount="indefinite" type="rotate" values="-100 12 14;45 12 14;45 12 14;45 12 14;20 12 14;10 12 14;0 12 14;35 12 14;45 12 14;55 12 14;50 12 14;15 12 14;-20 12 14;-100 12 14"></animateTransform>
                                </g>
                            </mask>
                            <rect width={24} height={24} fill="#000" mask="url(#lineMdSpeedTwotoneLoop0)"></rect>
                        </svg>       </span>
                    <span className="text-black text-5xl">متوسط</span>
                </div>


            </div>

        </div>
    );
};

export default Physics;
