'use client';
import React from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { GiTrophyCup } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { TbMessageFilled } from "react-icons/tb";
import { FaExclamationTriangle } from "react-icons/fa";

const Hero = () => {
    const Features = [
        {
            name: "اسئلة من جميع المصادر",
            paragraph:
                "ده هيخليك تلم الافكار من كل الكتب وتضمن اعلي درجة فامتحان نهاية السنه",
        },
        {
            name: "المنافسة مع صحابك",
            paragraph:
                "في لوحة الشرف هيكون ظاهر ترتيبك مبين الطلاب ومين المركز الاول وخلي ديما هدفك المركز الاول",
        },
        {
            name: "كل الكتب في مكان واحد",
            paragraph:
                "مش هتحتاج تدور كتير علشان تلاقي الافكار المهمة من كل الكتب الخارجية.",
        },
    ];

    const names = [
        {
            name: "احمد علي ",
            points: 50,
        },
        {
            name: "محمد سعيد ",
            points: 40,
        },
        {
            name: "علي محمود ",
            points: 30,
        },
    ];

    return (
        <div className="relative selection:text-yellow-400 mt-5 selection:bg-yellow-800 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            {/* Main Hero Section */}

            <div className=' absolute w-80 h-80 bg-slate-900 left-0 -bottom-48 rounded-full blur-2xl -z-20'></div>
            <div className=' absolute w-80 h-80 bg-slate-900 right-0  -bottom-48 rounded-full blur-2xl -z-20'></div>
            <div className=' absolute w-80 h-80 bg-slate-900 right-auto left-auto -bottom-48 rounded-full blur-2xl -z-20'></div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-60  md:mx-8">
                {/* Main Section */}

                {/* Secondary Section */}
                <div className="relative   col-span-1 bg-yellow-400 shadow-2xl bg-non bg-cover outline-dashed outline-offset-2 outline-red-500 w-fit p-6 md:p-9 rounded-xl flex items-center">
                    {/* Noise Effect */}
                    <div className="absolute pointer-events-none h-full w-fit opacity-5 bg-noise z-50"></div>

                    {/* Content */}
                    <h3 className="flex flex-col md:flex-row font-arabicUI3 items-center  justify-center  text-xl md:text-3xl lg:text-4xl text-center text-white">
                        <TbMessageFilled className="text-6xl md:text-8xl transition  hover:scale-150 hover:cursor-pointer" />
                         رسالة اليوم
                    </h3>
                </div>
                
                <div className="relative   col-span-1  bg-yellow-400  shadow-2xl bg-non2 bg-cover outline-dashed outline-offset-2 outline-green-500 w-fit p-4 md:p-9 rounded-xl flex items-center">
                    {/* Noise Effect */}
                    <div className="absolute pointer-events-none h-full w-full opacity-5 bg-noise z-50"></div>

                    {/* Content */}
                    <h3 className="flex flex-col md:flex-row font-arabicUI3 items-center  justify-center  text-xl md:text-3xl lg:text-4xl text-center text-white">
                        <FaExclamationTriangle className="text-6xl md:text-8xl transition  hover:scale-150 hover:cursor-pointer" />
                         تفعيل الحساب
                    </h3>
                </div>
                <div className="relative   col-span-2   md:col-span-3 bg-yellow-400 shadow-2xl bg-paton bg-cover outline-dashed outline-offset-2 outline-yellow-300 w-full p-6 md:p-9 rounded-xl flex items-center">
                    {/* Noise Effect */}
                    <div className="absolute pointer-events-none h-full w-full opacity-5 bg-noise z-50"></div>

                    {/* Content */}
                    <h3 className="flex flex-col md:flex-row font-arabicUI3 items-center justify-center  text-xl md:text-3xl lg:text-4xl text-center text-yellow-800">
                        <GiTrophyCup className="text-6xl md:text-8xl transition hover:scale-150 hover:cursor-pointer" />
                        موقع كويزاتك اكبر بنك اسئلة للمراجعة النهائية من جميع الكتب الخارجيه
                    </h3>
                </div>

            </div>


            {/* Features Section */}
            <div className="grid  grid-cols-1   lg:grid-cols-3 mt-8 mb-6 ">
                {/* Left Section */}

                <div className="rtl relative mt-6  bg-paton bg-cover shadow-2xl   col-span-2 h-fit bg-yellow-400 outline-dashed outline-offset-2 outline-yellow-300  md:mx-9 p-6 rounded-xl">


                    <h1 className="font-arabicUI2 m-auto flex justify-center text-yellow-800 text-3xl md:text-5xl">
                        مميزات منصة كويزاتك
                        <HiBadgeCheck />
                    </h1>
                    <div className="relative mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Features.map((item, index) => (
                            <div
                                key={index}
                                className="bg-daark outline-dashed outline-amber-950 outline-offset-2  bg-cover drop-shadow-2xl bg-yellow-500 hover:shadow-2xl shadow-black p-4 rounded-xl hover:scale-105 cursor-pointer transition-all ease-in-out duration-300"
                            >
                                <h2 className="font-arabicUI3 text-yellow-400 text-center text-xl md:text-xl">
                                    {item.name}
                                </h2>
                                <p className="font-arabicUI3 bg-paton p-3 rounded-xl mt-4 text-yellow-800 text-center bg-cover text-sm md:text-base">
                                    {item.paragraph}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section */}
                <div className="shadow-2xl mt-6  bg-paton bg-cover  lg:mx-8 outline-dashed outline-offset-2 outline-yellow-300 bg-yellow-400 p-6 rounded-xl">


                    <h1 className="font-arabicUI2 m-auto flex justify-center text-yellow-800 text-3xl md:text-5xl">
                        <FaClipboardList />
                        لوحة الشرف
                    </h1>
                    <div className="mt-6">
                        {names.map((item, index) => (
                            <div
                                key={index}
                                className=" bg-daark bg-cover outline-dashed outline-2 outline-offset-2 outline-amber-950  p-3 flex justify-between mt-4 font-arabicUI2 rounded-xl text-xl md:text-2xl text-white"
                            >
                                <h3>
                                    نقطة <span>{item.points}</span>
                                </h3>
                                <h3>{item.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
