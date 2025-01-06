'use client';
import React, { useState, useEffect } from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { GiTrophyCup } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { TbMessageFilled } from "react-icons/tb";
import ActiveSqu from "./ActiveSqu";

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
        { name: "احمد علي ", points: 50 },
        { name: "محمد سعيد ", points: 40 },
        { name: "علي محمود ", points: 30 },
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

    // Update the message after the component mounts
    useEffect(() => {
        setMessage(getRandomMessage());
    }, []);

    return (
        <div className="relative select-none cursor-default  selection:text-yellow-400 mt-5 selection:bg-yellow-800 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            {/* Main Hero Section */}
            <div className=' absolute w-80 h-80 bg-slate-900 left-0 -bottom-48 rounded-full blur-2xl -z-20'></div>
            <div className=' absolute w-80 h-80 bg-slate-900 right-0  -bottom-48 rounded-full blur-2xl -z-20'></div>
            <div className=' absolute w-80 h-80 bg-slate-900 right-auto left-auto -bottom-48 rounded-full blur-2xl -z-20'></div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-60  md:mx-8">
                {/* Main Section */}
                <div className="relative cursor-pointer hover:brightness-90 transition  col-span-1 bg-red-500 shadow-2xl bg-non bg-cover outline-dashed outline-offset-2 outline-red-500 w-fit p-6 md:p-9 rounded-xl flex items-center">
                    {/* Noise Effect */}
                    <div className="absolute pointer-events-none h-full w-fit opacity-5 bg-noise z-50"></div>

                    {/* Content */}
                    <h3 onClick={openDialog} className="flex select-none flex-col md:flex-row font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-white">
                        <TbMessageFilled className="text-6xl md:text-8xl transition hover:scale-150 hover:cursor-pointer" />
                        رسالة اليوم
                    </h3>
                </div>

                <ActiveSqu />

                <div className="relative col-span-2 md:col-span-3 bg-yellow-400 shadow-2xl bg-paton bg-cover outline-dashed outline-offset-2 outline-yellow-300 w-full p-6 md:p-9 rounded-xl flex items-center">
                    {/* Noise Effect */}

                    
                    {/* Content */}
                    <h3 className="flex flex-col md:flex-row font-arabicUI3 items-center justify-center text-xl md:text-3xl lg:text-4xl text-center text-yellow-800">
                        <GiTrophyCup className="text-6xl md:text-8xl transition hover:scale-150 hover:cursor-pointer" />
                        موقع كويزاتك اكبر بنك اسئلة للمراجعة النهائية من جميع الكتب الخارجيه
                    </h3>
                </div>

                <dialog
                    open={isOpen} // This will control the visibility of the dialog
                    className="rounded-xl max-w-[90%] font-arabicUI2 transition mt-24 backdrop-blur-lg p-3 bg-black/20 z-50 mr-auto ml-auto"
                >
                    <h1 className="bg-paton rtl bg-cover p-3 rounded-xl text-black text-center text-3xl">
                        {message ? message : 'Loading message...'}
                    </h1>
                    <button onClick={closeDialog} className="bg-non text-white bg-cover p-3 my-2 rounded-xl">
                        اغلاق الرسالة
                    </button>
                </dialog>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 mb-6">
                {/* Left Section */}
                <div className="rtl relative mt-6 bg-paton bg-cover shadow-2xl col-span-2 h-fit bg-yellow-400 outline-dashed outline-offset-2 outline-yellow-300 md:mx-9 p-6 rounded-xl">
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
                <div className="shadow-2xl mt-6 bg-non3 bg-blue-700 selection:bg-blue-600 selection:text-white bg-cover lg:mx-8 outline-dashed outline-offset-2 outline-blue-500  p-6 rounded-xl">
                    <h1 className="font-arabicUI2 m-auto flex justify-center text-white text-3xl md:text-5xl">
                        <FaClipboardList />
                        عظماء اليوم
                    </h1>
                    <div className="mt-6">
                        {names.map((item, index) => (
                            <div
                                key={index}
                                className=" bg-white  bg-cover outline-dashed outline-2 outline-offset-2 outline-white p-3 flex justify-between mt-4 font-arabicUI2 rounded-xl text-xl md:text-2xl text-blue-800"
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
