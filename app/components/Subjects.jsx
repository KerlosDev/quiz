import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFireAlt } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import TrueFocus from "./TrueFocus";

const Subjects = () => {
    const subjects = [
       
        {
            name: "انجليزى",
            img: "/en.png",
            books: ["كل وحدات المنهج", "شوامل"],
            link: "/english"
        },
        {
            name: "فرنساوى",
            img: "/fr.png",
            books: ["الاربع وحدات", "شوامل"],
            link: "/french"
        },

        {
            name: "كيمياء",
            img: "/chem.jpg",
            books: ["الخمس ابواب", "شوامل"],
            link: "/chem"
        },
        {
            name: "فيزياء",
            img: "/ph.png",
            books: ["كلاسيكية وحديثة", "شوامل"],
            link: "/phys"
        },
        {
            name: "احياء",
            img: "/bio2.jpg",
            books: ["الست ابواب", "شوامل"],
            link: "/bio"
        },
        {
            name: "جيولوجيا",
            img: "/geo.png",
            books: ["التلات ابواب"],
            link: "/geo"
        },
    ];

    return (
        <div id="subs" className="px-4 mt-1 sm:px-6 lg:px-8">
            {/* Header */}



            <h3 className="flex rtl justify-center cursor-default items-center m-auto font-arabicUI2 gap-2 text-4xl sm:text-6xl lg:text-7xl text-white text-center">

                <TrueFocus
                    sentence="يلا امتحن دلوقتي"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="red"
                    animationDuration={0.5}
                    pauseBetweenAnimations={1}
                />

                <FaFireAlt className="text-3xl sm:text-5xl lg:text-6xl text-red-500 animate-pulse" />

            </h3>


            {/* Subjects Grid */}
            <div className="p-3 m-3 mt-7 rtl grid grid-cols-1   md:grid-cols-2 lg:grid-cols-4 gap-14">
               
            <div
                            
                            className="relative h-fit group bg-paton hover:outline-none cursor-pointer  hover:brightness-75 bg-repeat bg-center bg-cover hover:scale-105 transition-transform duration-500 w-full  p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl  outline-dashed outline-offset-4 outline-yellow-300 bg-yellow-400"
                        >
                            <div>
                                {/* Subject Image */}
                                <Image
                                    width={200}
                                    className="group-hover:scale-90 mx-auto flex transition-transform duration-300"
                                    height={500}
                                    src='/ar.png'
                                    alt="arabic"
                                />

                                {/* Subject Name */}
                                <h3 className="flex bg-daark bg-cover bg-clip-text m-auto justify-center  leading-relaxed text-transparent text-7xl font-arabicUI2 ">
                                    عربي
                                </h3>

                                <div className="flex m-auto bg-daark bg-cover justify-center flex-wrap w-fit mt-2 outline-dashed outline-3 outline-offset-4 outline-yellow-800 rounded-xl text-yellow-400 bg-yellow-700 p-1">
                                   
                                        <h2
                                       
                                            className="p-1 gap-4 flex text-base sm:text-lg md:text-xl font-arabicUI2 break-words text-center"
                                        >
                                              نحو    &nbsp;   ادب &nbsp;  بلاغة &nbsp;  شوامل
                                        </h2>
                                
                                </div>
                            

                                {/* Hover Overlay */}
                                <div className="absolute font-arabicUI2 inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white  text-5xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">
                                    <div className="grid grid-cols-1">
                                        <span className="m-auto flex justify-center">
                                            <FaBookOpenReader className=" text-[89px] flex" />
                                        </span>

                                       قريبا..

                                    </div>
                                </div>
                            </div>

                        </div>
                
                {subjects.map((item, index) => (
                    <Link key={index} href={item.link}>
                        <div
                            key={index}
                            className="relative h-fit group bg-paton hover:outline-none cursor-pointer  hover:brightness-75 bg-repeat bg-center bg-cover hover:scale-105 transition-transform duration-500 w-full  p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl  outline-dashed outline-offset-4 outline-yellow-300 bg-yellow-400"
                        >
                            <div>
                                {/* Subject Image */}
                                <Image
                                    width={200}
                                    className="group-hover:scale-90 mx-auto flex transition-transform duration-300"
                                    height={500}
                                    src={item.img}
                                    alt={item.name}
                                />

                                {/* Subject Name */}
                                <h3 className="flex bg-daark bg-cover bg-clip-text m-auto justify-center  leading-relaxed text-transparent text-7xl font-arabicUI2 ">
                                    {item.name}
                                </h3>


                                <div className="flex m-auto bg-daark bg-cover justify-center flex-wrap w-fit mt-2 outline-dashed outline-3 outline-offset-4 outline-yellow-800 rounded-xl text-yellow-400 bg-yellow-700 p-1">
                                    {item.books?.map((book, bookIndex) => (
                                        <h2
                                            key={bookIndex}
                                            className="p-1  text-base sm:text-lg md:text-xl font-arabicUI2 break-words text-center"
                                        >
                                            {book}
                                        </h2>
                                    ))}
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute font-arabicUI2 inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white  text-5xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">
                                    <div className="grid grid-cols-1">
                                        <span className="m-auto flex justify-center">
                                            <FaBookOpenReader className=" text-[89px] flex" />
                                        </span>

                                        فتح الامتحانات

                                    </div>
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}

                <div

                    className="relative h-fit group bg-non3 hover:outline-none cursor-pointer  hover:brightness-75 bg-repeat bg-center bg-cover hover:scale-105 transition-transform duration-500 w-full  p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl  outline-dashed outline-offset-4 outline-blue-600 bg-yellow-400"
                >
                    <div>
                        {/* Subject Image */}
                        <Image
                            width={200}
                            className="group-hover:scale-90 mx-auto flex transition-transform duration-300"
                            height={500}
                            src='/prize.png'
                            alt='trophy'
                        />

                        {/* Subject Name */}
                        <h3 className="flex m-auto justify-center  leading-relaxed text-white text-7xl font-arabicUI2 ">
                            الكاس
                        </h3>


                        <div className="flex m-auto bg-white justify-center flex-wrap w-fit mt-2 outline-dashed outline-3 outline-offset-2 outline-white rounded-xl text-blue-700  p-1">

                            <h2
                                className="p-1  text-base sm:text-lg md:text-xl font-arabicUI2 break-words text-center"
                            >
                                قريبا..
                            </h2>

                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute font-arabicUI2 inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white  text-6xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">
                            <div className="flex gap-2">
                                قريبا..
                                <span className="m-auto flex justify-center">
                                    <FaBookOpenReader />
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Subjects;
