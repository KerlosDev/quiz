'use client';
import Image from 'next/image';
import GlobalApi from '../api/GlobalApi';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { FaLock, FaPlay } from 'react-icons/fa';
import RedButton from './RedButton';
import GreenButton from './GreenButton';
import YellowButton from './YellowButton';
import { usePremiumUser } from '../context/PremiumUserContext';
import CoutText from './CoutText';
import AdComponent from './AdComponent';

const Bio = () => {
    const [activeBook, setActiveBook] = useState(false);
    const [title, setTitle] = useState('احياء');
    const [dataBook, setDataBook] = useState([]);
    const [numbook, setNumBook] = useState(0);
    const [numberofquiz, setNumberQuiz] = useState(0);
    const premuserorNot = usePremiumUser();


    const { user } = useUser();



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
        chemData("bio");
    }, []);

    const chemData = () => {
        GlobalApi.biologyDAta("bio")
            .then((res) => {
                setDataBook(res.dataOfQuizs);
                setNumberQuiz(res?.dataOfQuizs?.length);
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    };


    // Function to filter and render quizzes based on numbook
    const renderQuizzes = () => {
        let filterKey = '';
        if (numbook === 1) filterKey = 'fasl1';
        if (numbook === 2) filterKey = 'fasl2';
        if (numbook === 3) filterKey = 'fasl3';
        if (numbook === 4) filterKey = 'fasl4';
        if (numbook === 5) filterKey = 'fasl5';
        if (numbook === 6) filterKey = 'fasl6';
        if (numbook === 7) filterKey = 'shamel1';
        if (numbook === 8) filterKey = 'shamel2';
        if (numbook === 9) filterKey = 'shamel3';



        return dataBook
            ?.filter((item) => item.level === filterKey)
            ?.map((item, index) => {
                const quizLink = !user
                    ? "/sign-up" // If no user is logged in, redirect to the sign-up page
                    : (
                        filterKey === 'fasl1'
                            ? `/bio/${item.id}`
                            : (premuserorNot ? `/bio/${item.id}` : `/payment`)
                    );
                return (
                    <Link key={item.id} href={quizLink}>
                        <h4 className='hover:scale-105   justify-between rtl bg-paton bg-cover text-center cursor-pointer transition w-full sm:w-11/12 md:w-10/12 lg:w-9/12 text-xl sm:text-2xl md:text-3xl lg:text-3xl font-arabicUI2 bg-yellow-400 text-yellow-800 p-3 rounded-xl m-3 mx-auto  flex'>
                            {item?.namequiz || 'No Title Available'}

                            {filterKey === 'fasl1' ?


                                <FaPlay className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />

                                :

                                (
                                    premuserorNot ? (
                                        <FaPlay className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                                    ) : (
                                        <FaLock className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                                    )
                                )
                            }
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
                    alt='bio'
                    src='/bio2.jpg'
                />
                <h3 className='font-arabicUI3 text-center drop-shadow-2xl text-yellow-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
                    {title}
                </h3>

                <div className='bg-yellow-800 bg-daark bg-cover cursor-default shadow-xl shadow-yellow-800/50 rounded-xl m-4 p-4'>
                    <h4 className='text-2xl sm:text-4xl md:text-5xl text-center  font-arabicUI2 bg-paton text-transparent bg-clip-text m-auto justify-center flex'>
                        {title === 'احياء' ? 'يلا اختار فصل تحله' : 'امتحانات الفصل'}
                    </h4>

                    {title === 'احياء' && <div>
                        <h4 className='font-arabicUI3 my-3 gap-2 rtl mx-auto mt-4 mb-2 justify-center text-center flex text-4xl text-yellow-800 bg-paton bg-cover p-4 rounded-xl'>
                            عافر حلمك يستاهل

                        </h4>
                    </div>}

                    {/* Render quizzes dynamically */}
                    {renderQuizzes()}
                </div>


                <CoutText number={2654} />


            </div>


            {/* Books Grid Section */}



            <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-2 h-fit gap-6 lg:col-span-2">
                <AdComponent></AdComponent>
                <RedButton handleClick={() => handleClick('الفصل الاول', 1)} title='الفصل الاول' number={1}  ></RedButton>
                <RedButton handleClick={() => handleClick('الفصل الثاني', 2)} title='الفصل الثاني' number={2}  ></RedButton>
                <RedButton handleClick={() => handleClick('الفصل الثالث', 3)} title='الفصل الثالث' number={3}  ></RedButton>
                <YellowButton handleClick={() => handleClick('الفصل الرابع', 4)} title='الفصل الرابع' number={4}  ></YellowButton>
                <YellowButton handleClick={() => handleClick('الفصل الخامس', 5)} title='الفصل الخامس' number={5}  ></YellowButton>
                <YellowButton handleClick={() => handleClick('الفصل السادس', 6)} title='الفصل السادس' number={6} size={4}  ></YellowButton>
                <GreenButton handleClick={() => handleClick('شوامل 1', 7)} title='شوامل 1' number={7}   ></GreenButton>
                <GreenButton handleClick={() => handleClick('شوامل 2', 8)} title='شوامل 2' number={8}   ></GreenButton>
                <GreenButton handleClick={() => handleClick('شوامل 3', 9)} title='شوامل 3' number={9}   ></GreenButton>



            </div>



        </div>
    );
};

export default Bio;
