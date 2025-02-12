'use client'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../api/GlobalApi'
import { IoPersonSharp } from "react-icons/io5";

const People = () => {

    const [admin, setAdmin] = useState([])
    const [members, setMembers] = useState([])
    const [codes, setCodes] = useState([])
    const [emailsByCode, setEmailsByCode] = useState({});

    useEffect(() => {
        invetedPeople()
    }, [])
    const invetedPeople = () => {
        GlobalApi.dataToAdmin().then(res => {
            console.log(res.codetests[0].jsonres2)
            setAdmin(res)
            setMembers(res.codetests[0].jsonres2)
            setCodes(res.codetests[0].jsonres)

            const emailsByCode = res.codetests[0].jsonres2.reduce((acc, curr) => {
                acc[curr.sentcode] = (acc[curr.sentcode] || 0) + 1;
                return acc;
            }, {});
            setEmailsByCode(emailsByCode);
        })
    }


    //   const numberOfCodes = 
    return (
        <div className='flex justify-center '>
            <div className=' bg-paton gap-4 lg:w-1/2 grid grid-cols-2 bg-cover m-5 p-5 rounded-xl '>

                <div className='backdrop-blur-md p-4  bg-black/20   rounded-xl   '>

                    <h5 dir='rtl' className=' flex text-4xl place-items-center gap-2 font-arabicUI3 text-white rounded-xl w-fit justify-center mx-auto  '>عدد الاكواد <IoPersonSharp />
                    </h5>
                    <h3 className=' text-white  text-center mt-5 text-8xl font-arabicUI3'>
                        {codes.length}
                    </h3>

                </div>
                <div className='backdrop-blur-md p-4  bg-black/20   rounded-xl   '>

                    <h5 dir='rtl' className=' flex text-4xl justify-center mx-auto  place-items-center gap-2 font-arabicUI3 text-white rounded-xl w-fit  '>عدد المدعوين <IoPersonSharp />
                    </h5>
                    <h3 className=' text-white  text-center mt-5 text-8xl font-arabicUI3'>
                        {members.length}
                    </h3>

                </div>

                <div className='backdrop-blur-md p-4 col-span-2  bg-black/20   rounded-xl   '>

                    <h5 dir='rtl' className=' flex text-3xl place-items-center gap-2 font-arabicUI3 text-white rounded-xl w-fit mx-auto  '> ايميلات الطلبة اللي دعت صحبها <IoPersonSharp />
                    </h5>
                    <div className='text-white text-center mt-5 font-arabicUI3'>
                        {Object.entries(emailsByCode).map(([code, count]) => (
                            <div key={code} className='text-2xl'>
                                {code}: {count} ايميل
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default People