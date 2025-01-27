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
import BlueButton from './BlueButton';


const English = () => {
    const [activeBook, setActiveBook] = useState(false);
    const [title, setTitle] = useState('لغة انجليزية');
    const [dataBook, setDataBook] = useState([]);
    const [numbook, setNumBook] = useState(0);
    const [numberofquiz, setNumberQuiz] = useState(0);
    const { user } = useUser();
    const premuserorNot = usePremiumUser();
    console.log(premuserorNot)

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
        chemData("chem");
    }, []);

    const chemData = () => {
        GlobalApi.englishData("en")
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
        if (numbook === 1) filterKey = 'unit1';
        if (numbook === 2) filterKey = 'unit2';
        if (numbook === 3) filterKey = 'unit3';
        if (numbook === 4) filterKey = 'unit4';
        if (numbook === 5) filterKey = 'unit5';
        if (numbook === 6) filterKey = 'unit6';
        if (numbook === 7) filterKey = 'unit7';
        if (numbook === 8) filterKey = 'unit8';
        if (numbook === 9) filterKey = 'unit9';
        if (numbook === 10) filterKey = 'unit10';
        if (numbook === 11) filterKey = 'unit11';
        if (numbook === 12) filterKey = 'unit12';


        return dataBook
            ?.filter((item) => item.level === filterKey)
            ?.map((item, index) => {
                const quizLink = !user
                    ? "/sign-up" // If no user is logged in, redirect to the sign-up page
                    : (
                        filterKey === 'unit1'
                            ? `/english/${item.id}`
                            : (premuserorNot ? `/english/${item.id}` : `/payment`)
                    );
                return (
                    <Link key={item.id} href={quizLink}>

                        <h4 className='hover:scale-105   justify-between rtl bg-paton bg-cover text-center cursor-pointer transition w-full sm:w-11/12 md:w-10/12 lg:w-9/12 text-xl sm:text-2xl md:text-3xl lg:text-3xl font-arabicUI2 bg-yellow-400 text-yellow-800 p-3 rounded-xl m-3 mx-auto  flex'>
                            {item?.namequiz || 'No Title Available'}

                            {filterKey === 'unit1' ?


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
                    alt='en'
                    src='/en.png'
                />
                <h3 className='font-arabicUI3 leading-normal text-center drop-shadow-2xl text-6xl text-yellow-900   '>
                    {title}
                </h3>

                <div className='bg-yellow-800 bg-daark bg-cover cursor-default shadow-xl shadow-yellow-800/50 rounded-xl m-4 p-4'>
                    <h4 className='text-2xl sm:text-4xl md:text-5xl text-center  font-arabicUI2 bg-paton text-transparent bg-clip-text m-auto justify-center flex'>
                        {title === 'لغة انجليزية' ? 'يلا اختار وحده تحلها' : 'امتحانات الوحده'}
                    </h4>

                    {title === 'لغة انجليزية' && <div>
                        <h4 className='font-arabicUI3 my-3 gap-2 rtl mx-auto mt-4 mb-2 justify-center text-center flex text-4xl text-yellow-800 bg-paton bg-cover p-4 rounded-xl'>
                            عافر حلمك يستاهل


                        </h4>
                    </div>}

                    {/* Render quizzes dynamically */}
                    {renderQuizzes()}
                </div>
                <CoutText number={1885}></CoutText>
            </div>

            {/* Books Grid Section */}


            <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-2 h-fit gap-6 lg:col-span-2">

                <RedButton handleClick={() => handleClick('UNIT 1', 1)} title='UNIT 1' number={1} font="font-arabicUI3"  ></RedButton>
                <RedButton handleClick={() => handleClick('UNIT 2', 2)} title='UNIT 2' number={2} font="font-arabicUI3"  ></RedButton>
                <RedButton handleClick={() => handleClick('UNIT 3', 3)} title='UNIT 3' number={3} font="font-arabicUI3"  ></RedButton>
                <RedButton handleClick={() => handleClick('UNIT 4', 4)} title='UNIT 4' number={4} font="font-arabicUI3"  ></RedButton>
                <YellowButton handleClick={() => handleClick('UNIT 5', 5)} title='UNIT 5' number={5} font="font-arabicUI3"  ></YellowButton>
                <YellowButton handleClick={() => handleClick('UNIT 6', 6)} title='UNIT 6' number={6} font="font-arabicUI3"  ></YellowButton>
                <YellowButton handleClick={() => handleClick('UNIT 7', 7)} title='UNIT 7' number={7} font="font-arabicUI3"  ></YellowButton>
                <YellowButton handleClick={() => handleClick('UNIT 8', 8)} title='UNIT 8' number={8} font="font-arabicUI3"  ></YellowButton>
                <GreenButton handleClick={() => handleClick('UNIT 9', 9)} title='UNIT 9' number={9} font="font-arabicUI3"   ></GreenButton>
                <GreenButton handleClick={() => handleClick('UNIT 10', 10)} title='UNIT 10' number={10} font="font-arabicUI3"  ></GreenButton>
                <GreenButton handleClick={() => handleClick('UNIT 11', 11)} title='UNIT 11' number={11} font="font-arabicUI3"  ></GreenButton>
                <GreenButton handleClick={() => handleClick('UNIT 12', 12)} title='UNIT 12' number={12} font="font-arabicUI3"  ></GreenButton>

                <BlueButton handleClick={() => handleClick('هيتم اضافة الشوامل قريبا', 13)} title='شوامل' number={13} font="font-arabicUI3"  ></BlueButton>



            </div>


        </div>

    );
};

export default English;
