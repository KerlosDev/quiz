'use client';
import Image from 'next/image';
import GlobalApi from '../api/GlobalApi';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsPatchCheckFill } from "react-icons/bs";
import { useUser } from '@clerk/nextjs';

const Geo = () => {
    const [activeBook, setActiveBook] = useState(false);
    const [title, setTitle] = useState('جيولوجيا');
    const [dataBook, setDataBook] = useState([]);
    const [numbook, setNumBook] = useState(0);
    const [numberofquiz, setNumberQuiz] = useState(0);

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
        chemData("geo");
    }, []);

    const chemData = () => {
        GlobalApi.subchem("geo")
            .then((res) => {
                console.log("Response: ", res);
                setDataBook(res);
                setNumberQuiz(res?.quizzes?.length);
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    };

    console.log("Number of quizzes:", numberofquiz);

    // Function to filter and render quizzes based on numbook
    const renderQuizzes = () => {
        let filterKey = '';
        if (numbook === 1) filterKey = 'emthan';
        if (numbook === 2) filterKey = 'alTfawak';

        return dataBook?.quizzes
            ?.filter((item) => item.chooseBook === filterKey)
            ?.map((item) => {
                const quizLink = !user ? "/sign-up" : `/quiz/${item.id}`;  // Set the link based on the user condition

                return (
                    <Link key={item.id} href={quizLink}>
                        <h4 className='hover:scale-105 bg-paton bg-cover text-center cursor-pointer transition w-full sm:w-11/12 md:w-10/12 lg:w-9/12 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-arabicUI2 bg-yellow-400 text-yellow-800 p-2 rounded-xl m-3 mx-auto justify-center flex'>
                            {item?.quiztitle || 'No Title Available'}
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
                    alt='geo'
                    src='/geo.png'
                />
                <h3 className='font-arabicUI3 text-center drop-shadow-2xl text-yellow-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
                    {title}
                </h3>

                <div className='bg-yellow-800 cursor-default shadow-xl shadow-yellow-800/50 rounded-xl m-4 p-4'>
                    <h4 className='text-2xl sm:text-4xl md:text-5xl text-center  font-arabicUI2 bg-paton text-transparent bg-clip-text m-auto justify-center flex'>
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
            </div>

            {/* Books Grid Section */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:col-span-2'>
                <div
                    onClick={() => handleClick('كتاب الامتحان', 1)}
                    className='hover:scale-110 transition cursor-pointer'>
                    <Image src='/geoemt.png' width={400} height={300} alt='chem' className='w-full h-auto' />
                </div>
                <div
                    onClick={() => handleClick('كتاب التفوق', 2)}
                    className='hover:scale-110 transition cursor-pointer'>
                    <Image src='/geotf.png' width={400} height={300} alt='chem' className='w-full h-auto' />
                </div>
                
                
            </div>
        </div>
    );
};

export default Geo;
