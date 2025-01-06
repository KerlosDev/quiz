'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '../api/GlobalApi';
import Link from 'next/link';
import QuizV from './QuizV';

const Subs = () => {
    const { user } = useUser();
    const [EnrollDAta, setEnrollData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className='m-5  bg-quiz  bg-cover  p-4 rounded-xl bg-center'>
            <div className=' absolute w-80 h-80 bg-slate-900 left-0 top-48 rounded-full blur-2xl -z-20'></div>

            <div className='p-5'>
                
               <QuizV />
            </div>
        </div>
    );
};

export default Subs;
