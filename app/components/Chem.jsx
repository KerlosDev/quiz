'use client';
import Image from 'next/image';
import GlobalApi from '../api/GlobalApi';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsPatchCheckFill } from "react-icons/bs";
import { useUser } from '@clerk/nextjs';

const Chem = () => {
    const [activeBook, setActiveBook] = useState(false);
    const [title, setTitle] = useState('كيمياء');
    const [dataBook, setDataBook] = useState([]);
    const [numbook, setNumBook] = useState(0);
    const [numberofquiz, setNumberQuiz] = useState(0)

    const { user } = useUser();


    
    // Handle click dynamically
    const handleClick = (namebook, index) => {
        setActiveBook(true);
        setTitle(namebook);
        setNumBook(index);
    };

    // Fetch data on component mount
    useEffect(() => {
        chemData("chem");
    }, []);

    const chemData = () => {
        GlobalApi.subchem("chem")
            .then((res) => {
                console.log("Response: ", res);
                setDataBook(res);

                setNumberQuiz(res?.quizzes?.length)

            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    };



    console.log("Number of quizzes:", numberofquiz);
    // Function to filter and render quizzes based on numbook
    const renderQuizzes = () => {
        let filterKey = '';
        if (numbook === 1) filterKey = 'avogadro';
        if (numbook === 2) filterKey = 'mandlef';
        if (numbook === 3) filterKey = 'emthan';

        return dataBook?.quizzes
            ?.filter((item) => item.chooseBook === filterKey)
            ?.map((item) => {
                const quizLink = !user ? "/sign-up" : `/quiz/${item.id}`;  // Set the link based on the user condition

                return (
                    <Link key={item.id} href={quizLink}>
                        <h4 className='hover:scale-105 bg-paton bg-cover text-center cursor-pointer transition w-11/12 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-arabicUI2 bg-yellow-400 text-yellow-800 p-2 rounded-xl m-3 mx-auto justify-center flex'>
                            {item?.quiztitle || 'No Title Available'}
                        </h4>
                    </Link>
                );
            });
    };

    return (
        <div className='m-8 grid grid-cols-1 lg:grid-cols-4 gap-6'>
            {/* Book Info Section */}
            <div
                className={`h-fit col-span-1 lg:col-span-2 m-5 lg:m-10 p-5 md:p-7 bg-paton bg-cover rounded-xl shadow-2xl shadow-yellow-400 bg-yellow-400 ${activeBook && 'lg:col-span-2'
                    }`}
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

                <div className='bg-yellow-800 shadow-xl shadow-yellow-800/50 rounded-xl m-4 p-4'>
                    <h4 className='text-3xl sm:text-4xl md:text-5xl font-arabicUI2 bg-paton  text-transparent bg-clip-text m-auto justify-center flex'>
                        {title === 'كيمياء' ? 'يلا اختار كتاب تحله' : 'امتحانات الكتاب'}
                    </h4>

                    {title === 'كيمياء' && <div>
                        <h4 className='  font-arabicUI3 rtl mx-auto mt-4 mb-2 justify-center text-center flex text-4xl text-yellow-800 bg-paton bg-cover p-4 rounded-xl '
                        >
                            عدد الامتحانات المتاحة

                            &nbsp;
                            <span>{numberofquiz}</span>
                            &nbsp;
                            <BsPatchCheckFill></BsPatchCheckFill></h4>
                    </div>}

                    {/* Render quizzes dynamically */}
                    {renderQuizzes()}
                </div>
            </div>

            {/* Books Grid Section */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2'>
                <div
                    onClick={() => handleClick('كتاب افوجادرو ', 1)}
                    className='hover:scale-110 transition cursor-pointer'
                >
                    <Image src='/xc.png' width={400} height={300} alt='chem' className='w-full h-auto' />
                </div>
                <div
                    onClick={() => handleClick('كتاب مندليف ', 2)}
                    className='hover:scale-110 transition cursor-pointer'
                >
                    <Image src='/shitos.png' width={400} height={300} alt='chem' className='w-full h-auto' />
                </div>
                <div
                    onClick={() => handleClick('كتاب الامتحان ', 3)}
                    className='hover:scale-110 transition cursor-pointer'
                >
                    <Image src='/emt.png' width={400} height={300} alt='chem' className='w-full h-auto' />
                </div>
            </div>
        </div>
    );
};

export default Chem;
