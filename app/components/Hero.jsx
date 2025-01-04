import React from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { GiTrophyCup } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";

const Hero = () => {
    const Features = [
        {
            name: "اسئلة من جميع المصادر",
            paragraph: "ده هيخليك تلم الافكار من كل الكتب وتضمن اعلي درجة فامتحان نهاية السنه",
        },
        {
            name: "المنافسة مع صحابك",
            paragraph: "في لوحة الشرف هيكون ظاهر ترتيبك مبين الطلاب ومين المركز الاول وخلي ديما هدفك المركز الاول",
        },
        {
            name: "كل الكتب في مكان واحد",
            paragraph: "مش هتحتاج تدور كتير علشان تلاقي الافكار المهمة من كل الكتب الخارجية.",
        },
    ];

    const names = [
        {
            name: "احمد علي ",
            points: 50
        },
        {
            name: "احمد علي ",
            points: 50
        },
        {
            name: "احمد علي ",
            points: 50
        }
    ]

    return (
        <div className="relative selection:text-yellow-400 selection:bg-yellow-800   flex flex-col justify-center items-center">
            {/* Background noise */}

            {/* Main Hero Section */}
            <div className="relative bg-yellow-400 shadow-2xl shadow-yellow-400/70 outline-dashed outline-offset-2 outline-yellow-300 mx-4 w-full max-w-4xl p-6 md:p-9 rounded-xl flex justify-center items-center">
                <h3 className="flex flex-col md:flex-row font-arabicUI3 items-center justify-center gap-3 text-2xl md:text-4xl text-center text-yellow-800">
                    <GiTrophyCup className="text-4xl transition hover:scale-150 flex hover:cursor-pointer md:text-8xl" />
                    موقع كويزاتك اكبر بنك اسئلة للمراجعة النهائية من جميع الكتب الخارجيه
                </h3>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 m-8 gap-4">
                {/* Left Section */}
                <div className="rtl relative col-span-2 h-fit  bg-yellow-400 outline-dashed outline-offset-2 outline-yellow-300 mx-4 md:mx-9 p-6 rounded-xl">
                    <h1 className="font-arabicUI2 m-auto flex justify-center text-yellow-800 text-3xl md:text-5xl">
                        مميزات منصة كويزاتك
                        <HiBadgeCheck />

                    </h1>
                    <div className="relative  mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Features.map((item, index) => (
                            <div
                                key={index}
                                className="bg-yellow-500 p-4 rounded-xl hover:scale-105 cursor-default transition"
                            >
                                <h2 className="font-arabicUI3 text-center text-xl md:text-2xl">
                                    {item.name}
                                </h2>
                                <p className="font-arabicUI3 text-yellow-700 text-center text-sm md:text-base">
                                    {item.paragraph}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section */}
                <div className="hidden lg:block mx-8  outline-dashed outline-offset-2 outline-yellow-300 bg-yellow-400 p-6 rounded-xl shadow-lg">
                    <div className="">
                        <h1 className="font-arabicUI2 m-auto flex justify-center text-yellow-800 text-3xl md:text-5xl">

                            <FaClipboardList />
                            لوحة الشرف


                        </h1>
                        {names.map((item, index) => {
                            return (
                                <div key={index} className=" bg-yellow-600 p-3 flex justify-between mt-4 font-arabicUI2 rounded-xl text-2xl text-white ">
                                    <h3>نقطة <span>{item.points} </span></h3>
                                    <h3>{item.name}  </h3>

                                </div>
                            )
                        })}

                        
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Hero;
