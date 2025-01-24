'use client';
import React, { useState, useEffect } from "react";
import { HiBadgeCheck } from "react-icons/hi";


import { TbMessageFilled } from "react-icons/tb";
import ActiveSqu from "./ActiveSqu";
import GreatToday from "./GreatToday";
import Image from 'next/image';

import { PremiumUserProvider } from '../context/PremiumUserContext';

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
        "خليك دايمًا متفائل، الخير جاي في الطريق.",
        "إنت قادر على كل حاجة تحلم بيها.",
        "اللي جاي أفضل بكتير، استنى وشوف.",
        "مفيش حاجة مستحيلة، لو عندك العزيمة.",
        "النجاح مش بالسرعة، النجاح بالصبر والمثابرة.",
        "حط هدف قدامك وامشي وراه، هتوصل أكيد.",
        "كل يوم فرصة جديدة تبدأ من جديد.",
        "كل فشل بيعلّمك دروس تقدر تبني عليها مستقبلك.",
        "إنت مش لوحدك، كلنا هنا علشان نساعد بعض.",
        "الطريق طويل بس دايمًا أول خطوة هي الأهم.",
        "ما تخليش أي حاجة توقفك عن حلمك.",
        "العمل الجاد هو مفتاح النجاح.",
        "افتح دماغك، كل فكرة ممكن تغير حياتك.",
        "بكرة أفضل لو فضلت ثابت على هدفك.",
        "إنت قوي، إنت مش لوحدك، وإنت هتوصل.",
        "الحياة مليانة فرص، استفيد منها.",
        "النجاح محتاج وقت، وصبر، و شوية اجتهاد.",
        "عيش يومك واترك بكرة لربنا.",
        "النجاح مش لحظة، النجاح هو طريق طويل.",
        "كل حاجة هتجيك في وقتها، بس خلي عندك صبر.",
        "إنت أكتر قوة من أي عقبة قدامك.",
        "حاول تركز على الحاجات الإيجابية في حياتك.",
        "اعمل دلوقتي علشان بكرة يبقى أحلى.",
        "الطريق للنجاح مليان تحديات، خلي التحدي دا شغلك.",
        "لو الدنيا مش مريحة دلوقتي، خلي عندك أمل في التغيير.",
        "مفيش حاجة بتدوم، يعني أي مشكلة هتعدي.",
        "افرح بكل خطوة صغيرة بتاخدها نحو هدفك.",
        "الحياة مش دايمًا ساهلة، بس أنت أقوى من أي صعوبة.",
        "اللي انت عاوزه قريب منك، بس خليك شجاع.",
        "خلك واثق في نفسك وفي قدرتك على التغيير.",
        "اتعلم من كل تجربة، حتى لو كانت فاشلة.",
        "كل يوم فرصة جديدة إنك تبدأ من جديد.",
        "الناس الناجحة ما بيسمعوش للكلام السلبي.",
        "حط في بالك دايمًا: العمل الجاد بيدفع ثمنه.",
        "مفيش حاجة تستحق وقتك لو مش بتحبها.",
        "إنك تبدأ هو أهم حاجة.",
        "العزيمة والإرادة أقوى من أي حاجز.",
        "ما تخليش أي حاجة توقفك عن حلمك.",
        "كل خطوة تقربك أكتر من هدفك.",
        "دايمًا حافظ على إيمانك بنفسك.",
        "بكرة جاي ومعاه الفرص، خلي عندك أمل.",
        "مهما كان الطريق طويل، النهاية هتكون جميلة.",
        "إنت أقوى من أي صعوبة في طريقك.",
        "صبرك النهاردة هيوصل لمستقبل أحلى.",
        "النجاح مش بالسرعة، النجاح بالمثابرة.",
        "خلي عندك رؤية واضحة، وكل حاجة هتتيسر.",
        "افعل ما تحب، وبالتأكيد هتحقق نجاح كبير.",
        "في الحياة كلها، الأمل هو السلاح الأقوى.",
        "خليك دايمًا إيجابي، التغيير بيبدأ منك."

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

    // Update the message after the component mounts
    useEffect(() => {
        setMessage(getRandomMessage());
    }, []);

    return (
        <PremiumUserProvider>
            <div className="relative select-none cursor-default  selection:text-yellow-400 mt-5 selection:bg-yellow-800  bg-cover flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
                {/* Main Hero Section */}
                <div className=' absolute w-80 h-80 bg-slate-900 left-0 -bottom-48 rounded-full blur-2xl -z-20'></div>
                <div className=' absolute w-80 h-80 bg-slate-900 right-0  -bottom-48 rounded-full blur-2xl -z-20'></div>
                <div className=' absolute w-80 h-80 bg-slate-900 right-auto left-auto -bottom-48 rounded-full blur-2xl -z-20'></div>

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

                        <h3 onClick={openDialog} className="flex flex-col  md:text-5xl select-none  font-arabicUI3 items-center justify-center text-3xl  lg:text-4xl text-center text-white">
                            <TbMessageFilled className="text-7xl lg:text-8xl transition hover:scale-150 hover:cursor-pointer" />
                            رسالة اليوم
                        </h3>                </div>


                    <ActiveSqu />


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
