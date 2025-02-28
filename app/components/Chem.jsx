'use client';
import Image from 'next/image';
import GlobalApi from '../api/GlobalApi';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { FaLock, FaPlay } from 'react-icons/fa';
import RedButton from './RedButton';
import YellowButton from './YellowButton';
import GreenButton from './GreenButton';
import { usePremiumUser } from '../context/PremiumUserContext';
import BlueButton from './BlueButton';
import CoutText from './CoutText';
import AdComponent from './AdComponent';

const English = () => {
    const [activeBook, setActiveBook] = useState(false);
    const [title, setTitle] = useState('كيمياء');
    const [dataBook, setDataBook] = useState([]);
    const [numbook, setNumBook] = useState(0);
    const [numberofquiz, setNumberQuiz] = useState(0);



    const { user } = useUser();

    const premuserorNot = usePremiumUser();

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
        chemData();
    }, []);

    const chemData = () => {
        GlobalApi.chemstryDAta()
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
        if (numbook === 6) filterKey = 'shamel';



        return dataBook
            ?.filter((item) => item.level === filterKey)
            ?.map((item, index) => {
                const quizLink = !user
                    ? "/sign-up" // If no user is logged in, redirect to the sign-up page
                    : (

                        `/chem/${item.id}`
                    );
                return (
                    <Link key={item.id} href={quizLink}>
                        <h4 className='hover:scale-105   justify-between rtl bg-paton bg-cover text-center cursor-pointer transition w-full sm:w-11/12 md:w-10/12 lg:w-9/12 text-xl sm:text-2xl md:text-3xl lg:text-3xl font-arabicUI2 bg-yellow-400 text-yellow-800 p-3 rounded-xl m-3 mx-auto  flex'>
                            {item?.namequiz || 'No Title Available'}





                            <FaPlay className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />


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
                    alt='chem'
                    src='/chem.jpg'
                />
                <h3 className='font-arabicUI3 text-center drop-shadow-2xl text-yellow-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
                    {title}
                </h3>

                <div className='bg-yellow-800 bg-daark bg-cover cursor-default shadow-xl shadow-yellow-800/50 rounded-xl m-4 p-4'>
                    <h4 className='text-2xl sm:text-4xl md:text-5xl text-center  font-arabicUI2 bg-paton text-transparent bg-clip-text m-auto justify-center flex'>
                        {title === 'كيمياء' ? 'يلا اختار فصل تحله' : 'امتحانات الفصل'}
                    </h4>

                    {title === 'كيمياء' && <div>
                        <h4 className='font-arabicUI3 my-3 gap-2 rtl mx-auto mt-4 mb-2 justify-center text-center flex text-4xl text-yellow-800 bg-paton bg-cover p-4 rounded-xl'>
                            عافر حلمك يستاهل
                        </h4>
                    </div>}

                    {/* Render quizzes dynamically */}
                    {renderQuizzes()}
                </div>
                <CoutText number={2052}></CoutText>
            </div>

            {/* Books Grid Section */}


            <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-2 h-fit gap-6 lg:col-span-2">

                <AdComponent></AdComponent>

                <RedButton handleClick={() => handleClick("الباب الاول", 1)} title="الباب الاول" number={1} ></RedButton>
                <RedButton handleClick={() => handleClick("الباب التاني", 2)} title="الباب التاني" number={2} ></RedButton>
                <YellowButton handleClick={() => handleClick("الباب التالت", 3)} title="الباب التالت" number={3} ></YellowButton>
                <YellowButton handleClick={() => handleClick("الباب الرابع", 4)} title="الباب الرابع" number={4} ></YellowButton>
                <GreenButton handleClick={() => handleClick("الباب الخامس", 5)} title="الباب الخامس" number={5} size={4}  ></GreenButton>
                <BlueButton handleClick={() => handleClick("شوامل", 6)} title="شوامل" number={6} size={4} ></BlueButton>


            </div>





        </div>
    );
};

export default English;
