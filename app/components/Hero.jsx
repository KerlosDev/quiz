'use client';
import React, { useState, useEffect } from "react";
import { HiBadgeCheck } from "react-icons/hi";


import { TbMessageFilled } from "react-icons/tb";
import GreatToday from "./GreatToday";
import Image from 'next/image';
import { IoPersonSharp } from "react-icons/io5";
import { PremiumUserProvider } from '../context/PremiumUserContext';
import Link from "next/link";

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


    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState(null); // Initially set to null

    // Open the dialog
    const openDialog = () => setIsOpen(true);

    // Close the dialog
    const closeDialog = () => setIsOpen(false);

    const messages = [
        "الله قدّر كل هذا، و اللهُ كفيلٌ به، اطمئن يا كتكوتي ❤️🐥",

        "لو علمت مقاصد الأقدار لبكيت من سوء ظنك بالله يا كتكوتي ❤️🐥",

        "لله في تأخيره تدبيرٌ عظيم فاصبر ❤️🐥",
        , " لا تيأس فالله يرسل جبره في عز الإنكسار ❤️🐥 "
        , " لعل الله نجاك وأنتَ لضيق بصيرتك تظنُ أنكَ غرقت ! ❤️🐥"
        , " لرُبما يعوضك الله بشئ أحب إليك مما فقدت ❤️🐥"
        , " الله قدّر كل هذا، و اللهُ كفيلٌ به، اطمئن يا كتكوتي ❤️🐥"
        , "وإن ضاقت فعند الله متسع ❤️🐥 "
        , "إن أراد الله أن يُرسل لك الخير حمّله إليك ولو علي ظهر عدوّك ❤️🐥 "
        , " عيونك دي ولا القمر يكتكوتي 😂❤️"
        , " لا يمكنك أن تُشفي في نفس البيئة التي جعلتك مريضاً ؛ غادر يا كتكوتي ❤️🐥"
        , "اتركها تأتي كما أرادها الله لعلها تأتي كما تمناها قلبك يا كتكوتي ❤️🐥 "
        , "كل سُبل الأرض لا تقف أمام خيرِ أرادهُ الله لك ❤️🐥 "
        , "اتعلم تسيب كل واحد علي راحته واللي راحته معاك هيجيلك يا كتكوتي ❤️🐥 "
        , "مُنجيّك أمس ، مُنجيك اليوم وكل يوم يا كتكوتي ❤️🐥 "
        , "لن يخذلك الله وهو يعلم بأنك تُردد في داخلك إن الله معي❤️🐥 "
        , " لا تفقد الأمل وإن أصابك حزن يا كتكوتي ، تفائل بأن من جعل للحزن سبباً جعل للفرح أسباباً ❤️🐥"
        , "من رضي بقضاء الله أرضاه الله بجميل قدره ؛ فالخيرة فيما اختاره الله ❤️🐥 "
        , "لعل الإبتلاء الذي لا تُحبه يقودك إلي قدر جميل لم تحلم به ❤️🐥 "
        , "امشِ علي رجلك المكسورة ولا تترك أثر يدك علي كتف أحد يا كتكوتي ❤️🐥 "
        , "ثِق بالله هو ألطف من أن يراك حزيناً ولا يجبُرك ❤️🐥 "
        , "اللي تقلان عليك شبعان ذُل عند غيرك جمعية ودايرة لا تقلق يا كتكوتي ❤️🐥 "
        , " لعل الله نجاك وأنتَ لضيق بصيرتك تظنُ أنكَ غرقت ! ❤️🐥"
        , " الصفعة التي لا تتعلم منها تستحقها مجدداً يا كتكوتي ❤️🐥"
        , "ما يغلق اللهُ باباً دون قارعةٍ إلا ويفتح بالتيسير أبواباً ❤️🐥 "
        , "لَا تَدْرِي لَعلَّ اللَّهَ يُحْدِثُ بَعْدَ ذلكَ أَمْراً ❤️🐥 "
        , " وإن ضاقت بك الأركان يوماً فرُكن الله رحبٌ لا يضيق ❤️🐥"
        , "الرفسة الجامدة متجيش إلا من العجل اللي دلعته يا كتكوتي ❤️🐥 "
        , " لا تحزن إن الله معنا ❤️🐥"
        , "اتركها تأتي كما كتبها الله لك لعلها تأتي كما تمناها قلبك يا كتكوتي ❤️🐥 "
        , " يكفي أننا عند الله لا نهون ❤️🐥"
        , " لله في تأخيره تدبيرٌ عظيم فاصبر ❤️🐥"
    ];

    // Get a random message from the array
    const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    };

    const handleScrollToSub = () => {
        const targetElement = document.getElementById('subs');
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.error("Element with id 'subs' not found.");
        }
    };

    const { user } = useUser()
    // Update the message after the component mounts
    useEffect(() => {
        setMessage(getRandomMessage());
    }, []);

    return (
        <PremiumUserProvider>
            <div className="relative select-none cursor-default  selection:text-yellow-400 mt-5 selection:bg-yellow-800  bg-cover flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
                {/* Main Hero Section */}


                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-60  md:mx-8">
                    {/* Main Section */}



                    <dialog
                        open={isOpen} // This will control the visibility of the dialog
                        className="rounded-xl max-w-[90%] font-arabicUI2 transition mt-24 backdrop-blur-lg p-3 bg-black/20 z-50 mr-auto ml-auto"
                    >
                        <h1 className="bg-paton  rtl bg-cover p-3 rounded-xl text-amber-950 text-center text-3xl">
                            {message ? message : 'Loading message...'}
                        </h1>
                        <button onClick={closeDialog} className="bg-non text-white bg-cover p-3 my-2 rounded-xl">
                            اغلاق الرسالة
                        </button>
                    </dialog>
                </div>


                <div className=" grid gap-5  grid-cols-2 p-3 lg:px-10 lg:grid-cols-5">



                    <div className=" mt-2  cursor-pointer hover:brightness-90 transition  justify-center  col-span-1 h-full bg-red-500 shadow-2xl bg-non bg-cover outline-dashed outline-offset-2 outline-red-500  p-6 md:p-9 rounded-xl flex items-center ">
                        <Link href={` ${user ? '/friends' : '/sign-up'}`}>
                            <h3 className="flex flex-col  md:text-5xl select-none  font-arabicUI3 items-center justify-center text-3xl  lg:text-4xl text-center text-white">
                                <IoPersonSharp className="text-7xl lg:text-8xl transition hover:scale-150 hover:cursor-pointer" />
                                دعوة الاصدقاء
                            </h3>
                        </Link>
                    </div>


                    <div className="col-span-2 lg:col-span-3  h-full  bg-yellow-400 shadow-2xl bg-paton bg-cover  outline-dashed outline-offset-2 outline-yellow-300  p-6 mt-2 rounded-xl flex items-center">

                        <h3 className="block md:flex  font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-yellow-800 ">

                            <Image
                                onClick={handleScrollToSub}
                                src="/trophy.png"
                                width={200}
                                height={200}
                                className="drop-shadow-2xl cursor-pointer m-auto mb-5 md:m-0  hover:scale-110 transition-transform duration-500 ease-in-out"
                                alt="trophy"
                            />


                            <span className="  leading-normal  text-right  text-4xl md:leading-normal bg-cover bg-daark bg-clip-text text-transparent md:text-5xl rtl   " >
                                موقع كويزاتك اكبر بنك اسئلة للثانوية العامة
                                ❤️
                            </span>
                        </h3>
                    </div>

                </div>

                {/* Features Section */}
                <div className="grid j grid-cols-1 lg:grid-cols-3 px-2 mb-6">
                    {/* Left Section */}
                    <div className="rtl relative mt-6 bg-paton bg-cover shadow-2xl col-span-2 h-fit bg-yellow-400 outline-dashed outline-offset-2 outline-yellow-300 md:mx-9 p-6 rounded-xl">
                        <h1 className="font-arabicUI2 m-auto flex justify-center text-yellow-800 text-3xl md:text-5xl">
                            مميزات منصة كويزاتك
                            <HiBadgeCheck />
                        </h1>

                        <div className="relative mt-6  gap-9 grid grid-cols-1  md:grid-cols-1 lg:grid-cols-3 ">
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
                    <GreatToday></GreatToday>
                </div>
            </div>
        </PremiumUserProvider>
    );
};

export default Hero;
