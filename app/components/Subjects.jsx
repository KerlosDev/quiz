import Image from "next/image";
import React from "react";
import { FaFireAlt } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";

const Subjects = () => {
    const subjects = [
        {
            name: "عربي",
            img: "/ar.png",
            books: ["الامتحان", "بيان", "كيان", "الابداع"],

        },
        {
            name: "انجليزي",
            img: "/en.png",
            books: ["المعاصر", "العمالقة", "A1"],

        },
        {
            name: "فرنساوي",
            img: "/fr.png",
            books: ["ميرسي", "المعاصر"],

        },
        {
            name: "جيولوجيا",
            img: "/geo.png",
            books: ["التفوق", "الامتحان"],

        },
        {
            name: "كيمياء",
            img: "/chem.jpg",
            books: ["التفوق", "الامتحان", "افوجادرو", "مندليف"],
        },
        {
            name: "فيزياء",
            img: "/ph.png",
            books: ["نيوتن", "الامتحان"],
        },
        {
            name: "احياء",
            img: "/bio2.jpg",
            books: ["التفوق", "الامتحان",],
        },
    ];

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <h3 className="flex justify-center items-center m-auto font-arabicUI2 gap-2 text-4xl sm:text-6xl lg:text-7xl text-white text-center">
                <FaFireAlt className="text-3xl sm:text-5xl lg:text-6xl text-red-500 animate-pulse" />
                يلا امتحن دلوقتي
            </h3>

            {/* Subjects Grid */}
            <div className="p-3 m-3 mt-7 rtl grid grid-cols-2   sm:grid-cols-3 lg:grid-cols-4 gap-14">
                {subjects.map((item, index) => (
                    <div
                        key={index}
                        className="relative h-fit group bg-paton hover:outline-none cursor-pointer  hover:brightness-75 bg-repeat bg-center bg-cover hover:scale-105 transition-transform duration-500 w-full m-3 mt-8 p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl shadow-yellow-400/70 outline-dashed outline-offset-2 outline-yellow-300 bg-yellow-400"
                    >
                        <div>
                            {/* Subject Image */}
                            <Image
                                width={800}
                                className="group-hover:scale-90 transition-transform duration-300"
                                height={800}
                                src={item.img}
                                alt={item.name}
                            />

                            {/* Subject Name */}
                            <h3 className="flex m-auto justify-center p-1 leading-relaxed text-yellow-700 text-2xl sm:text-3xl lg:text-4xl font-arabicUI">
                                {item.name}
                            </h3>


                            <div className="flex m-auto justify-center flex-wrap w-fit mt-10 outline-dashed outline-4 outline-offset-2 outline-yellow-700 rounded-xl text-yellow-400 bg-yellow-700 p-1">
                                {item.books?.map((book, bookIndex) => (
                                    <h2
                                        key={bookIndex}
                                        className="p-1 text-base sm:text-lg md:text-xl font-arabicUI2 break-words text-center"
                                    >
                                        {book}
                                    </h2>
                                ))}
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute font-arabicUI2 inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl sm:text-3xl lg:text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="grid grid-cols-1">
                                    فتح الامتحانات
                                    <span className="m-auto flex justify-center">
                                        <FaBookOpenReader />
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subjects;
