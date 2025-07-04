'use client';
import Image from 'next/image';
import GlobalApi from '../api/GlobalApi';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaLock, FaPlay } from 'react-icons/fa';
import RedButton from './RedButton';
import GreenButton from './GreenButton';
import YellowButton from './YellowButton';
import BlueButton from './BlueButton';
import CoutText from './CoutText';

const French = () => {
    const [activeBook, setActiveBook] = useState(false);
    const [title, setTitle] = useState('لغة فرنسية');
    const [dataBook, setDataBook] = useState([]);
    const [numbook, setNumBook] = useState(0);
    const [numberofquiz, setNumberQuiz] = useState(0); const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const premiumAccess = localStorage.getItem('premiumAccess') === 'true';
        setHasPremiumAccess(premiumAccess);
    }, []);



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
        chemData("fr");
    }, []); const chemData = () => {
        GlobalApi.frenchData("fr")
            .then((res) => {
                console.log("French API Response:", res);
                if (res && res.dataOfQuizs) {
                    console.log("Setting data:", res.dataOfQuizs);
                    setDataBook(res.dataOfQuizs);
                    setNumberQuiz(res.dataOfQuizs.length);
                } else {
                    console.error("Invalid response structure:", res);
                    setDataBook([]);
                    setNumberQuiz(0);
                }
            })
            .catch((err) => {
                console.error("Error fetching French data:", err);
                setDataBook([]);
                setNumberQuiz(0);
            });
    }; const handleQuizClick = (quizId, level) => {
        // Allow free access to all exams in first section (ex10)
        if (level === "ex10") {
            router.push(`/french/${quizId}`);
            return;
        }

        // Check premium access for other sections
        if (hasPremiumAccess) {
            router.push(`/french/${quizId}`);
        } else {
            router.push('/payment');
        }
    }; const renderQuizzes = () => {
        if (!dataBook || !dataBook.length) return null;

        // Map button numbers to exam levels
        const levelMap = {
            1: "ex10",  // First button shows exams 1-10
            2: "ex20",  // Second button shows exams 11-20
            30: "ex30"  // Third button (future exams)
        };

        const currentLevel = levelMap[numbook];
        const unitQuizzes = dataBook.filter(quiz => quiz.level === currentLevel);

        return unitQuizzes.map((quiz, index) => {
            const chapterNumber = numbook + 1;
            const isLocked = chapterNumber !== 1 && !hasPremiumAccess;

            return (<div
                key={quiz.id}
                onClick={() => handleQuizClick(quiz.id, quiz.level)}
                className="cursor-pointer"
            >
                <h4 className='hover:scale-105 justify-between rtl bg-paton bg-cover text-center cursor-pointer transition w-full sm:w-11/12 md:w-10/12 lg:w-9/12 text-xl sm:text-2xl md:text-3xl lg:text-3xl font-arabicUI2 bg-yellow-400 text-yellow-800 p-3 rounded-xl m-3 mx-auto flex'>
                    {quiz?.namequiz || 'No Title Available'}
                    {quiz.level === "ex10" ? <FaPlay className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" /> :
                        hasPremiumAccess ? <FaPlay className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" /> :
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
                    alt='fr'
                    src='/fr.png'
                />
                <h3 className='font-arabicUI3 text-center drop-shadow-2xl text-yellow-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
                    {title}
                </h3>

                <div className='bg-yellow-800 bg-daark bg-cover cursor-default shadow-xl shadow-yellow-800/50 rounded-xl m-4 p-4'>
                    <h4 className='text-2xl sm:text-4xl md:text-5xl text-center  font-arabicUI2 bg-paton text-transparent bg-clip-text m-auto justify-center flex'>
                        {title === 'لغة فرنسية' ? 'يلا اختار شامل تحله' : 'امتحانات شوامل'}
                    </h4>

                    {title === 'لغة فرنسية' && <div>
                        <h4 className='font-arabicUI3 my-3 gap-2 rtl mx-auto mt-4 mb-2 justify-center text-center flex text-4xl text-yellow-800 bg-paton bg-cover p-4 rounded-xl'>
                            عافر حلمك يستاهل
                        </h4>
                    </div>}

                    {/* Render quizzes dynamically */}
                    {renderQuizzes()}
                </div>
                <CoutText number={450}></CoutText>
            </div>

            {/* Books Grid Section */}

            <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-2 h-fit gap-6 lg:col-span-2">

                <RedButton handleClick={() => handleClick(' من 1 لـ 10 شوامل', 1)} title='شوامل 1' number={1} font="font-arabicUI3"   ></RedButton>
                <RedButton handleClick={() => handleClick(' من 11 لـ 20 شوامل', 2)} title='شوامل 2' number={2} font="font-arabicUI3"  ></RedButton>

                <BlueButton handleClick={() => handleClick('هيتم اضافة المزيد', 30)} title='قريبا' number={2} font="font-arabicUI3"  ></BlueButton>

            </div >

        </div >
    );
};

export default French;