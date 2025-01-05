'use client'
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { FaExclamationTriangle } from "react-icons/fa";
import GlobalApi from '../api/GlobalApi';
import { PiHeartFill } from "react-icons/pi";

const ActiveSqu = () => {
    const { user } = useUser();
    const [premuserorNot, setPremUser] = useState(false)

    useEffect(() => {
        user?.primaryEmailAddress?.emailAddress && premiumusers(user?.primaryEmailAddress?.emailAddress)
    }, [user])

    const premiumusers = () => {
        GlobalApi.premUsers(user?.primaryEmailAddress?.emailAddress).then(res => {
            console.log(res.userEnrolls[0].isHePaid)
            setPremUser(res.userEnrolls[0].isHePaid)
        })
    }
    return (
        <div className="relative   col-span-1  bg-yellow-400  shadow-2xl bg-non2 bg-cover outline-dashed outline-offset-2 outline-green-500 w-fit p-4 md:p-9 rounded-xl flex items-center">
            {/* Noise Effect */}
            <div className="absolute pointer-events-none h-full w-full opacity-5 bg-noise z-50"></div>

            {!premuserorNot || !user ? (
                <h3 className="flex flex-col md:flex-row font-arabicUI3 items-center  justify-center  text-xl md:text-3xl lg:text-4xl text-center text-white">
                    <FaExclamationTriangle className="text-6xl md:text-8xl transition  hover:scale-150 hover:cursor-pointer" />
                    تفعيل الحساب
                </h3>

            ) : (
                <h3 className="flex flex-col md:flex-row font-arabicUI3 items-center  justify-center  text-xl md:text-3xl lg:text-4xl text-center text-white">
                    <PiHeartFill className="text-6xl md:text-8xl transition  hover:scale-150 hover:cursor-pointer" />
                    الحساب اتفعل 
                </h3>
            )}
            {/* Content */}

        </div>
    )
}

export default ActiveSqu