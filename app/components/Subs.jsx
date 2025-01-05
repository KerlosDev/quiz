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

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            EnrooolUser(user.primaryEmailAddress.emailAddress);
        }
    }, [user]);

    const EnrooolUser = async (email) => {

        try {
            const res = await GlobalApi.EnrollmentUsers(email);
            setEnrollData(res.userEnrolls || []);
        } catch (error) {
            console.error('Error fetching enrollment data:', error);
            setEnrollData([]);
        } finally {

        }
    };

    return (
        <div className='m-5  bg-quiz bg-cover  p-4 rounded-xl bg-center'>
            <div className='p-5'>

                {EnrollDAta.length === 0 && (<div>

                    <div className=' cursor-default  backdrop-blur-xl rounded-xl w-fit m-auto outline-dashed mb-8  outline-2 bg-black/20 outline-white  p-5'>
                        <h4 className=' m-auto flex justify-center font-arabicUI2 max-sm:text-3xl text-center  text-white text-5xl'
                        >
                            انت لسة ممتحنتش اي امتحان للاسف
                        </h4>
                    </div>
                </div>)}


                {EnrollDAta.length > 0 && <QuizV />}
            </div>
        </div>
    );
};

export default Subs;
