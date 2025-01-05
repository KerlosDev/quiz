'use client';
import Image from 'next/image';
import GlobalApi from '../api/GlobalApi';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Chem = () => {
    const [activeBook, setActiveBook] = useState(false);
    const [title, setTitle] = useState('كيمياء');
    const [dataBook, setDataBook] = useState([]);
    const [numbook, setNumBook] = useState(0);

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
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    };

    // Function to filter and render quizzes based on numbook
    const renderQuizzes = () => {
        let filterKey = '';
        if (numbook === 1) filterKey = 'avogadro';
        if (numbook === 2) filterKey = 'mandlef';
        if (numbook === 3) filterKey = 'emthan';

        return dataBook?.quizzes
            ?.filter((item) => item.chooseBook === filterKey)
            ?.map((item) => (
                <Link key={item.id} href={`/quiz/${item.id}`}>
                    <h4
                        className='hover:scale-105 text-center cursor-pointer transition w-11/12 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-arabicUI2 bg-yellow-400 text-yellow-800 p-2 rounded-xl m-3 mx-auto justify-center flex'>
                        {item?.quiztitle || 'No Title Available'}
                    </h4>
                </Link>
            ));
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
                    <h4 className='text-3xl sm:text-4xl md:text-5xl font-arabicUI2 text-yellow-400 m-auto justify-center flex'>
                        {title === 'كيمياء' ? 'يلا اختار كتاب تحله' : 'امتحانات الكتاب'}
                    </h4>

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
