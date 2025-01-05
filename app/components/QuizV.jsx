'use client'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../api/GlobalApi'
import { useUser } from '@clerk/nextjs'
import ProgCircle from './ProgCircle'
import { BsPatchCheckFill } from 'react-icons/bs'

const QuizV = () => {

    const { user } = useUser()
    const email = user?.primaryEmailAddress?.emailAddress;
    const [quiz, setQuiz] = useState([])

    useEffect(() => {
        quizdata(email)
    }, [])

    const quizdata = () => {
        GlobalApi.vquiz(email).then(res => {


            setQuiz(res.quizresults)
        })
    }


    return (
        <div>
            <div className=' cursor-default  backdrop-blur-xl rounded-xl w-fit m-auto outline-dashed mb-8  outline-2 bg-black/20 outline-white  p-5'>
                <h4 className=' m-auto flex justify-center place-items-center font-arabicUI2 max-sm:text-3xl text-center gap-4  text-white text-5xl'>
                    <BsPatchCheckFill className=' text-4xl'></BsPatchCheckFill>
                    الكويزات اللي انت امتحنتها</h4>
            </div>

            < div className=' grid cursor-default rtl rtl-grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 grid-cols-6'>
                {quiz.slice().reverse().map((item, index) => (
                    <div key={index} className=' hover:scale-110 transition-all duration-300 m-5 h-fit backdrop-blur-2xl shadow-white/10 outline-dashed outline-white outline-2 shadow-xl  p-5 rounded-xl'>
                        <div className=''>
                            <h4 className=' font-arabicUI2 text-center text-white text-2xl mb-4'>{item?.nameofquiz}</h4>
                            <h4 className=' font-arabicUI2 text-center text-white text-2xl mb-4'>
                                {item?.nameofsub === 'chem' ? (
                                    <img src="/chem.jpg" className='m-auto justify-center flex items-center' width={100} height={100} alt="كيمياء" />// Icon for 'chem'
                                ) : item?.nameofsub === 'ph' ? (
                                    <FaAtom className="inline-block text-yellow-400 mr-2" /> // Icon for 'ph'
                                ) : null}
                            </h4>
                            <p className=' font-arabicUI3 text-white/80 my-4 flex justify-center mx-auto text-4xl'>{(item?.quizGrade / item?.numofqus) * 100}%</p>
                            <ProgCircle hight={10} nsaba={(item?.quizGrade / item?.numofqus) * 100
                            }></ProgCircle>
                        </div>
                    </div>
                ))}


            </div>

            <div className=' cursor-default mt-8  backdrop-blur-xl rounded-xl w-fit m-auto outline-dashed mb-8  outline-2 bg-black/20 outline-white  p-5'>
                <h4 className=' m-auto flex justify-center font-arabicUI2 max-sm:text-3xl text-center  text-white text-5xl'>الكويزات اللي انت امتحنتها</h4>
            </div>
        </div>
    )
}

export default QuizV