'use client'
import Image from 'next/image';
import GlobalApi from '../api/GlobalApi';
import React, { useEffect, useState } from 'react'

const Chem = () => {

    const [activeBook, setActiveBook] = useState(false)
    const [title, setTitle] = useState('كيمياء')
    const [dataBook,setdataBook] = useState([])

    const handleClick = (namebook) => {
        setActiveBook(true)
        setTitle(namebook)
    }
 

     useEffect(() => {
         chemdata()
        }, []);
    
        const chemdata = () => {
            GlobalApi.subchem().then((res) => {
                console.log("Response: ", res.chems[0]);
                setdataBook(res.chems[0])
    
            })
                .catch((err) => {
                    console.error("Error: ", err);
                });
        }
    

    return (


        <div className=' m-8 grid grid-cols-4'>

            <div className={`  h-screen col-span-2   m-10  p-7 bg-paton bg-cover rounded-xl shadow-2xl shadow-yellow-400 bg-yellow-400   ${activeBook && " col-span-2 " }`} >

                <Image width={200} className=' items-center flex justify-center m-auto' height={200} alt='chem' src='/chem.jpg'/>
                <h3 className=' font-arabicUI3 text-center text-yellow-900 text-7xl'>{title}</h3>
            </div>

     
            <div className=' grid grid-cols-2 m-6 col-span-2'>

                  
            <div onClick={ ()=> handleClick("كتاب افوجادرو ",1)} className=' hover:scale-110 transition  '>
                <Image src='/xc.png' width={400} height={300} alt='chem'/>
            </div>
            
            
            <div onClick={ ()=> handleClick("كتاب مندليف ",2)} className=' hover:scale-110 transition  '>
                <Image src='/shitos.png' width={400} height={300} alt='chem'/>
            </div>
            <div onClick={ ()=> handleClick("كتاب الامتحان ",2)} className=' hover:scale-110 transition  '>
                <Image src='/emt.png' width={400} height={300} alt='chem'/>
            </div>

                
            </div>
          
        </div>



    )
}

export default Chem