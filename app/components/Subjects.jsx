import Image from 'next/image';
import React from 'react'
import { FaFireAlt } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";

const Subjects = () => {

    const subjects = [
        {
            name: "عربي",
            img: "/ar.png"
        },
        {
            name: "انجليزي",
            img: "/en.jpg"
        },
        {
            name: "جيولوجيا",
            img: "/geo.png"
        },
        {
            name: "كيمياء",
            img: "/chem.jpg"
        }
        ,
        {
            name: "فيزياء",
            img: "/ph.png"
        }
        ,
        {
            name: "احياء",
            img: "/bio2.jpg"
        }
    ]
    return (
        <div>
            <h3 className=' flex justify-center place-items-center m-auto font-arabicUI2 gap-2 text-7xl text-white'>
                <FaFireAlt className=' text-6xl text-red-500 animate-pulse' />
                يلا امتحن دلوقتي



            </h3>
            <div className=' p-3 m-3 mt-7 rtl grid grid-cols-5'>
                {subjects.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className='relative group bg-paton hover:outline-none cursor-pointer hover:brightness-75 bg-repeat bg-center bg-cover hover:scale-110 transition duration-500 w-fit m-3 mt-8 p-8 rounded-xl shadow-2xl shadow-yellow-400/70 lg:block outline-dashed outline-offset-2 outline-yellow-300 bg-yellow-400 mx-8'
                        >

                            <Image width={800} className=' group-hover:scale-90 transition' height={800} src={item.img} alt={item.name} />


                            <h3 className='flex m-auto justify-center p-1 leading-relaxed text-yellow-700 text-4xl font-arabicUI'>
                                {item.name}
                            </h3>


                            <div className="absolute font-arabicUI2 inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">
                                <div className=' grid grid-cols-1 '>
                                    فتح الامتحانات
                                    <span className=' m-auto flex justify-center'><FaBookOpenReader /></span>
                                
                                    
                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>

        </div>
    )
}

export default Subjects