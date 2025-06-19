'use client';
import Image from 'next/image';
import GlobalApi from '../api/GlobalApi';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaPlay } from 'react-icons/fa';
import RedButton from './RedButton';
import GreenButton from './GreenButton';
import YellowButton from './YellowButton';
import BlueButton from './BlueButton';
import CoutText from './CoutText';

const Geo = () => {
    const [activeBook, setActiveBook] = useState(false);
    const [title, setTitle] = useState('جيولوجيا');
    const [dataBook, setDataBook] = useState([]);
    const [numbook, setNumBook] = useState(0);
    const [numberofquiz, setNumberQuiz] = useState(0);
    const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
    const router = useRouter();

    // Handle click dynamically
    const handleClick = (namebook, index) => {
        setActiveBook(true);
        setTitle(namebook);
        setNumBook(index);
        window.scroll({ top: 0, behavior: 'smooth' });
    };

    // Fetch data and check premium access on component mount
    useEffect(() => {
        const premiumAccess = localStorage.getItem('premiumAccess') === 'true';
        setHasPremiumAccess(premiumAccess);
        chemData();
    }, []);

    const chemData = () => {
        GlobalApi.geoData("geo")
            .then((res) => {
                setDataBook(res.dataOfQuizs);
                setNumberQuiz(res?.dataOfQuizs?.length);
            })
            .catch((err) => {
                console.error("Error fetching geography data:", err);
            });
    };

    // Function to filter and render quizzes based on numbook
    const renderQuizzes = () => {
        let filterKey = '';
        if (numbook === 1) filterKey = 'fasl1';
        if (numbook === 2) filterKey = 'fasl2';
        if (numbook === 3) filterKey = 'fasl3';

        return dataBook
            ?.filter((item) => item.level === filterKey)
            ?.map((item, index) => {
                const isFreePart = numbook === 1; // First chapter is free
                const quizLink = isFreePart || hasPremiumAccess ?
                    `/geo/${item.id}` : '/payment';

                return (
                    <div
                        key={item.id}
                        onClick={() => router.push(quizLink)}
                        className="cursor-pointer"
                    >
                        <h4 className='hover:scale-105 justify-between rtl bg-paton bg-cover text-center cursor-pointer transition w-full sm:w-11/12 md:w-10/12 lg:w-9/12 text-xl sm:text-2xl md:text-3xl lg:text-3xl font-arabicUI2 bg-yellow-400 text-yellow-800 p-3 rounded-xl m-3 mx-auto flex'>
                            {item?.namequiz || 'No Title Available'}
                            {isFreePart || hasPremiumAccess ?
                                <FaPlay className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" /> :
                                <FaLock className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />}
                        </h4>
                    </div>
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
                    alt='geo'
                    src='/geo.png'
                />
                <h3 className='font-arabicUI3 text-center drop-shadow-2xl text-yellow-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
                    {title}
                </h3>

                <div className='bg-yellow-800 bg-daark bg-cover cursor-default shadow-xl shadow-yellow-800/50 rounded-xl m-4 p-4'>
                    <h4 className='text-2xl sm:text-4xl md:text-5xl text-center font-arabicUI2 bg-paton text-transparent bg-clip-text m-auto justify-center flex'>
                        {title === 'جيولوجيا' ? 'يلا اختار كتاب تحله' : 'امتحانات الكتاب'}
                    </h4>

                    {title === 'جيولوجيا' && <div>
                        <h4 className='font-arabicUI3 my-3 gap-2 rtl mx-auto mt-4 mb-2 justify-center text-center flex text-4xl text-yellow-800 bg-paton bg-cover p-4 rounded-xl'>
                            عافر حلمك يستاهل
                        </h4>
                    </div>}

                    {/* Render quizzes dynamically */}
                    {renderQuizzes()}
                </div>
                <CoutText number={400}></CoutText>
            </div>

            {/* Books Grid Section */}
            <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-2 h-fit gap-6 lg:col-span-2">
                <RedButton handleClick={() => handleClick('الباب الاول', 1)} title='الباب الاول' number={1} font="font-arabicUI3" ></RedButton>
                <YellowButton handleClick={() => handleClick('الباب التاني', 2)} title='الباب التاني' number={2} font="font-arabicUI3" ></YellowButton>
                <GreenButton handleClick={() => handleClick('الباب التالت', 3)} title='الباب التالت' number={3} size={4} font="font-arabicUI3" ></GreenButton>
                <BlueButton handleClick={() => handleClick('هيتم اضافة المزيد', 30)} title='قريبا' number={2} font="font-arabicUI3" ></BlueButton>
            </div>
        </div>
    );
};

export default Geo;