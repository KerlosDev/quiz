'use client'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/api/GlobalApi';
import { HiHeart } from "react-icons/hi";


import Link from 'next/link';
const Page = () => {


    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false); // State for loading status
    const [showmodel, setshowmodel] = useState(false)
    const handlenumber = (e) => {
        setNumber(e.target.value);
    };

    const { user } = useUser();

    const handleclicknum = async () => {

        if (!user || number.length < 10) return; // Validate input and user existence

        setLoading(true); // Start loading when sending data
        try {
            const response = await GlobalApi.sendEnrollData(
                user?.primaryEmailAddress?.emailAddress,
                number
            );
            console.log("Data sent successfully:", response);
        } catch (error) {
            console.error("Error sending data:", error);
        } finally {
            setLoading(false);
            setshowmodel(true)// Stop loading after sending data


        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleclicknum(); // Trigger the button click when Enter is pressed
        }
    };

    return (
        <div className='text-white max-sm:text-2xl text-5xl m-3 font-abril mt-7'>

            {user ? (
                <div className='w-1/2 max-md:w-full max-sm:w-full m-auto bg-quiz   p-6  rounded-xl shadow-2xl shadow-red-900/30'>
                    <h1 className='m-auto flex justify-center font-arabicUI3'>
                        مرحبا بك فبوابه الدفع
                    </h1>

                    <div className='mt-6 rounded-tr-2xl grid grid-cols-2'>
                        <div className='border backdrop-blur-xl rounded-tl-xl'>
                            <h1 className='text-3xl place-items-center  mr-0 flex justify-center font-arabicUI3 mt-4'>
                                {user.firstName}
                            </h1>
                        </div>
                        <div className='border flex place-items-center rounded-tr-xl backdrop-blur-xl'>
                            <h1 className='place-items-center py-4 text-4xl m-auto flex justify-center font-arabicUI3 -mt-1'>
                                الاسم
                            </h1>
                        </div>
                    </div>

                    <div className='backdrop-blur-lg grid grid-cols-2'>
                        <div className='border rounded-bl-2xl'>
                            <h1 className=' max-sm:text-sm/4 text-2xl place-items-center mr-0 flex justify-center font-arabicUI3 m-2'>
                                {user.primaryEmailAddress.emailAddress}
                            </h1>
                        </div>
                        <div className='border flex place-items-center rounded-br-xl'>
                            <h1 className='place-items-center text-3xl m-auto flex font-arabicUI3 justify-end text-right'>
                                الايميل
                            </h1>
                        </div>
                    </div>

                    <div className='backdrop-blur-lg p-5 border mt-5 rounded-2xl'>
                        <h1 className='m-auto mt-6 flex justify-center text-center  font-arabicUI3 place-items-center leading-relaxed max-md:text-4xl'>
                            <span>وسيلة الدفع فودافون كاش</span>
                        </h1>
                        <h1 className='m-auto mt-6 flex justify-center font-arabicUI3 place-items-center'>
                            حول علي الرقم ده
                        </h1>
                        <h1 className='m-auto mt-6 flex justify-center font-arabicUI3 place-items-center'>
                            01080506463
                        </h1>
                        <h1 className='m-auto mt-6 flex justify-center font-arabicUI3 bg-black/15 border shadow-2xl shadow-white/20 p-4 rounded-xl w-fit place-items-center'>
                            مبلغ : 50 جنيه
                        </h1>
                        <h1 className='m-auto mt-6 flex justify-center leading-relaxed text-center text-sm font-arabicUI3 place-items-center'>
                            علي كل عمليه دفع بيتم تحويل 5 جنية لجمعية الهلال الاحمر الفلسطيني عشان توصل لاخواتنا هناك
                        </h1>


                        {!showmodel ? (
                            <div className='m-auto mt-6 rounded-xl justify-center font-arabicUI3 bg-black/15 border shadow-2xl shadow-white/20'>
                                <h1 className='p-2 rounded-xl w-fit text-center leading-relaxed place-items-center'>
                                    بعد متحول ابعت الرقم اللي حولت منه
                                </h1>
                                <input
                                    type="number"
                                    value={number}
                                    placeholder='01000000000'
                                    onKeyDown={handleKeyPress}
                                    onChange={handlenumber}
                                    maxLength="12"
                                    size="12"
                                    className='my-5 p-2 rounded-lg w-4/5 flex justify-center m-auto text-black'
                                />

                                <button
                                    disabled={number.length < 10}
                                    onClick={handleclicknum}
                                    className={`${loading ? "bg-gray-500" : "bg-red-500"
                                        } p-3 rounded-xl flex justify-center m-auto shadow-xl disabled:bg-red-300 disabled:text-white shadow-red-500/40 my-10 duration-700`}
                                >
                                    {loading ? "جاري الإرسال..." : <>
                                        <HiHeart />
                                        تم التحويل
                                    </>}
                                </button>

                            </div>

                        ) : (
                            <>
                                <h4 className=' flex font-arabicUI3 outline-dashed outline-2  bg-white/10   p-5 m-5 rounded-2xl text-center leading-normal'
                                >تم ارسال البيانات وهيتم تفعيل الحساب خلال 24 ساعة

                                </h4>
                                <Link href='/'>
                                    <div className=' flex justify-center m-auto font-arabicUI2 bg-white/20 w-fit p-2 rounded-xl outline-1 outline-white outline-dashed'>
                                        <h1>الصفحة الرئيسية</h1>
                                    </div>
                                </Link>
                            </>)}
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default Page;


