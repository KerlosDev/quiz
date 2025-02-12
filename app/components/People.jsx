'use client'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../api/GlobalApi'
import { IoPersonSharp } from "react-icons/io5";

const People = () => {

    const [admin, setAdmin] = useState([])
    const [members, setMembers] = useState([])
    const [codes, setCodes] = useState([])
    const [emailsByCode, setEmailsByCode] = useState({});
    const [studentEmails, setStudentEmails] = useState({});

    useEffect(() => {
        invetedPeople()
    }, [])
    const invetedPeople = () => {
        GlobalApi.dataToAdmin().then(res => {
            console.log("API response", res);

            setAdmin(res)
            setMembers(res.codetests[0].jsonres2)
            setCodes(res.codetests[0].jsonres)

            const emailsByCode = res.codetests[0].jsonres2.reduce((acc, curr) => {
                acc[curr["friend code"]] = (acc[curr["friend code"]] || 0) + 1;
                return acc;
            }, {});
            setEmailsByCode(emailsByCode);
            console.log("emailsByCode", emailsByCode);

            const studentEmails = res.codetests[0].jsonres.reduce((acc, curr) => {
                acc[curr.studentCode] = curr.email;
                return acc;
            }, {});
            setStudentEmails(studentEmails);
            console.log("studentEmails", studentEmails);
        }).catch(error => {
            console.error("Error fetching data", error);
        });
    }

    return (
        <div className='flex justify-center '>
            <div className=' bg-paton gap-4 lg:w-1/2 grid grid-cols-1  lg:grid-cols-2 bg-cover m-5 p-5 rounded-xl '>

                <div className='backdrop-blur-md p-4  bg-black/20   rounded-xl   '>

                    <h5 dir='rtl' className=' flex text-lg lg:text-4xl place-items-center gap-2 font-arabicUI3 text-white rounded-xl w-fit justify-center mx-auto  '>عدد الاكواد <IoPersonSharp />
                    </h5>
                    <h3 className=' text-white  text-center mt-5 text-8xl   font-arabicUI3'>
                        {codes.length}
                    </h3>

                </div>
                <div className='backdrop-blur-md p-4  bg-black/20   rounded-xl   '>

                    <h5 dir='rtl' className=' flex text-xl lg:text-4xl justify-center mx-auto  place-items-center gap-2 font-arabicUI3 text-white rounded-xl w-fit  '>عدد المدعوين <IoPersonSharp />
                    </h5>
                    <h3 className=' text-white  text-center mt-5 text-8xl font-arabicUI3'>
                        {members.length}
                    </h3>

                </div>

                <div className='backdrop-blur-md pt-6 lg:p-4 col-span-2  bg-black/20   rounded-xl   '>

                    <h5 dir='rtl' className=' flex text-xl lg:text-3xl place-items-center gap-2 font-arabicUI3 text-white rounded-xl w-fit mx-auto  '> ايميلات الطلبة اللي دعت صحبها <IoPersonSharp />
                    </h5>
                    <div className=' mx-auto text-white text-center mt-5 w-fit font-arabicUI3'>
                        {Object.entries(emailsByCode).map(([code, count]) => (
                            <div key={code} className='text-lg lg:text-4xl bg-black/20 p-2  m-3 rounded-xl'>
                                 {`  ${studentEmails[code]} =>   `} <span className=' bg-black/40 px-4 py-2  rounded-full'>{count}</span>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default People