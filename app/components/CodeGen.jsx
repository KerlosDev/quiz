'use client'
import { useUser } from '@clerk/nextjs';
import React, { useState, useEffect } from 'react'
import CountUp from './CountUp';
import GlobalApi from '../api/GlobalApi';
import { FaUserFriends } from "react-icons/fa";
import { FaBarcode } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";
import { BsFillSendCheckFill } from "react-icons/bs";
import { FaRegFaceAngry } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";

const CodeGen = () => {
    const [code, setCode] = useState(0);
    const [sentcode, setSendCode] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [peopleInvented, setPeopleInvented] = useState([]);
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    const clerkId = user?.id;

    useEffect(() => {
        code && codeapi();
    }, [code]);

    const codeapi = () => {
        GlobalApi.codegen(code);
        GlobalApi.invetedPeople().then((res) => {
            const filteredPeople = res.codetests[0].jsonres2.filter(person => person.sentcode === code);
            setPeopleInvented(filteredPeople);
        });
    };

    const generateReferralCode = async (clerkId) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(user?.id);

        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        const hashNumber = parseInt(hashArray.slice(0, 6).map(b => b.toString(16)).join(""), 16);
        return setCode((hashNumber % 1000000).toString().padStart(6, "0"));
    };

    useEffect(() => {
        if (clerkId) {
            generateReferralCode(clerkId);
        }
    }, [clerkId]);

    const buttonSendCode = async () => {
        const lastAttemptDate = localStorage.getItem('lastAttemptDate');
        const today = new Date().toISOString().split('T')[0];

        if (sentcode === 0 || sentcode === code) {
            setError("بلاش ذكاء يسطا");
            return;
        }

        if (lastAttemptDate === today) {
            setError("ليك محاولة فاليوم بس ");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res = await GlobalApi.codegen2({ "sentcode": sentcode, "email": email });
            console.log(res);
            if (!res || res.errors) {
                setError("انت بعت كود خلاص غير متاح انك تبعت تاني للاسف ..");
                localStorage.setItem('lastAttemptDate', today);
            } else {
                setSuccess(true);
            }
        } catch (error) {
            setError("حصل مشكلة اثناء ارسال الكود");
            localStorage.setItem('lastAttemptDate', today);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='bg-yellow-400 rounded-xl lg:rounded-l-xl bg-paton bg-cover rouxl p-4  lg:p-8'>
                <div>
                    <h3 dir='rtl' className='gap-2 backdrop-blur-sm m-4 p-4  text-md md:text-2xl lg:text-4xl rounded-xl bg-white font-arabicUI3 flex place-items-center justify-center'> الكود الخاص بك <FaBarcode className='text-xl md:text-2xl' /></h3>
                    <h3 className='m-5 p-5 font-arabicUI3 mx-auto flex justify-center text-5xl  md:text-6xl'>
                        <CountUp to={code} duration={0.20}></CountUp>
                    </h3>
                </div>
                <div>
                    <h3 className='backdrop-blur-sm m-4 p-4 text-xl  place-items-center md:text-2xl rounded-xl bg-white font-arabicUI3 flex justify-center gap-2' dir='rtl'> حط كود صحبك <FaUserFriends /></h3>
                    <input value={sentcode} onChange={(e) => { setSendCode(e.target.value) }} type="number" className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none my-4 p-4 text-4xl text-black/90 rounded-xl w-full md:w-11/12 mx-auto flex font-arabicUI3' placeholder='000000' />
                    <button onClick={buttonSendCode} className='bg-green-500 bg-cover text-white rounded-xl flex gap-2 place-items-center font-arabicUI3 p-4 mx-4 mb-4 text-xl md:text-3xl' disabled={loading}>
                        <BsFillSendCheckFill />  {loading ? <CgSpinner /> : success ? "تم ارسال الكود بنجاح" : "ارسال الكود "}
                    </button>
                    {error && <p dir='rtl' className='text-red-100 font-arabicUI3 bg-cover bg-red-500 m-4 rounded-xl p-4 text-xl md:text-2xl text-center flex place-items-center gap-2 justify-center'>{error}<FaRegFaceAngry /></p>}
                </div>
            </div>
            <div className='bg-white rounded-xl md:p-1 xl:p-1'>
                <div>
                    <h4 className='bg-black/10 leading-relaxed font-arabicUI3 text-xl md:text-2xl   m-4 p-3 border-4 text-center rounded-xl border-black'>الاشخاص اللي انت عملتلهم دعوة</h4></div>
                {peopleInvented.length > 0 ? (
                    <ul className='font-arabicUI3 xl:text-xl  bg-black/10   text-sm  lg:text-lg m-4 p-1 md:p-2 border-4 text-center rounded-xl border-black'>
                        {peopleInvented.map((person, index) => (
                            <li className='my-3' key={index}><span className={` ${ index < 9 ? "bg-black text-white/90  " : "bg-green-500 text-white/90 "}  rounded-full p-1 `}>{index + 1}</span> - {person.email}</li>
                        ))}
                    </ul>
                ) : (
                    <h4 className='bg-black/10 leading-relaxed font-arabicUI3 text-xl m-4 p-2 border-4 text-center rounded-xl border-black'>لا مفيش حد انت دعوتة للأسف</h4>
                )}
            </div>
        </>
    );
}

export default CodeGen;