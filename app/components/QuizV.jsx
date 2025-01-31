'use client';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../api/GlobalApi';
import { useUser } from '@clerk/nextjs';
import ProgCircle from './ProgCircle';
import { BsPatchCheckFill } from 'react-icons/bs';
import { IoBarChart } from 'react-icons/io5';
import CryptoJS from 'crypto-js';

const QuizV = () => {
    const [showMore, setShowMore] = useState(false);
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        if (email) {
            quizdata(email);
        }
    }, [email]); // Ensure that useEffect is triggered only when email changes

    const quizdata = () => {
        GlobalApi.vquiz().then(res => {

            // Decrypt the encrypted quiz data
            const decryptionKey = 'jdfhaksjdh38457389475fjks46jy6i786kadhfkjsahdfkjash';
            const decryptedQuiz = res.testres[0].jsonres.map((item) => {
                try {
                    const bytes = CryptoJS.AES.decrypt(item.encryptedData, decryptionKey);
                    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

                    // Check if the decrypted string is valid JSON
                    if (decryptedString) {
                        return JSON.parse(decryptedString);
                    } else {
                        console.error("Decrypted string is not valid JSON:", decryptedString);
                        throw new Error("Decrypted string is empty or invalid");
                    }
                } catch (error) {
                    console.error("Error decrypting or parsing item:", error);
                    return null; // Return null for items that fail to decrypt or parse
                }
            }).filter(item => item !== null); // Filter out any null items

            setQuiz(decryptedQuiz); // Store decrypted data in quiz state
        });
    };


    const filterByEmail = (email) => {
        return quiz.filter(item => item.userEmail === email);
    };

    const filteredData = filterByEmail(email);


    const subjectTotals = filteredData.reduce((acc, item) => {
        if (!acc[item.sub]) {
            acc[item.sub] = { numofqus: 0, quizGrade: 0 };
        }
        acc[item.sub].numofqus += item.totalQuestions;
        acc[item.sub].quizGrade += item.score;
        return acc;
    }, {});
 

    if (filteredData.length === 0) return <div>
        <div className=' cursor-default  backdrop-blur-xl rounded-xl w-fit m-auto outline-dashed mb-8  outline-2 bg-black/20 outline-white  p-5'>
            <h4 className=' m-auto flex justify-center font-arabicUI2 max-sm:text-3xl text-center  text-white text-5xl'
            >
                انت لسة ممتحنتش اي امتحان للاسف
            </h4>
        </div>
    </div>; // Show loading message while data is being fetched

    const subjectOrder = ['ar', 'en', 'fr', 'chem', 'ph', 'bio', 'geo'];
    const sortedSubjects = Object.keys(subjectTotals).sort((a, b) => subjectOrder.indexOf(a) - subjectOrder.indexOf(b));

    return (

        <div>

            {
                quiz.length > 0 && (

                    <div>
                        <div className='cursor-default backdrop-blur-xl rounded-xl w-fit m-auto outline-dashed mb-8 outline-2 bg-black/20 outline-white p-5'>
                            <h4 className='m-auto flex justify-center place-items-center font-arabicUI2 max-sm:text-3xl text-center gap-4 text-white text-5xl'>
                                <BsPatchCheckFill className='text-4xl'></BsPatchCheckFill>
                                الكويزات اللي انت امتحنتها النهاردة
                            </h4>
                        </div>

                        <div>


                            < div className=' grid cursor-default rtl rtl-grid max-sm:grid-cols-2 gap-4 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 grid-cols-6'>
                                {filteredData.slice(-20).reverse().map((item, index) => (
                                    <div key={index} className=' hover:scale-110 transition-all duration-300 md:m-5 h-fit bg-black/15 backdrop-blur-2xl shadow-white/10 outline-dashed outline-white outline-2 shadow-xl  p-5 rounded-xl'>
                                        <div className=''>
                                            <h4 className=' font-arabicUI2 text-center md:text-2xl text-white text-sm mb-4'>{item?.quizName}</h4>
                                            <h4 className=' font-arabicUI2 text-center text-white text-2xl mb-4'>
                                                {item?.sub === 'chem' && (
                                                    <img src="/chem.jpg" className='m-auto justify-center flex items-center' width={100} height={100} alt="كيمياء" />
                                                )}
                                                {item?.sub === 'ar' && (
                                                    <img src="/ar.png" className='m-auto justify-center flex items-center' width={100} height={100} alt="عربي" />
                                                )}
                                                {item?.sub === 'ph' && (
                                                    <img src="/ph.png" className='m-auto justify-center flex items-center' width={100} height={100} alt="فيزياء" />
                                                )}
                                                {item?.sub === 'bio' && (
                                                    <img src="/bio2.jpg" className='m-auto justify-center flex items-center' width={100} height={100} alt="أحياء" />
                                                )}
                                                {item?.sub === 'en' && (
                                                    <img src="/en.png" className='m-auto justify-center flex items-center' width={100} height={100} alt="إنجليزي" />
                                                )}
                                                {item?.sub === 'fr' && (
                                                    <img src="/fr.png" className='m-auto justify-center flex items-center' width={100} height={100} alt="فرنسي" />
                                                )}
                                                {item?.sub === 'geo' && (
                                                    <img src="/geo.png" className='m-auto justify-center flex items-center' width={100} height={100} alt="فرنسي" />
                                                )}
                                            </h4>
                                            <p className=' font-arabicUI3 text-white/80  text-xl md:text-5xl my-4 flex justify-center mx-auto '>{((item?.score / item?.totalQuestions) * 100).toFixed(1)}%</p>
                                            <ProgCircle hight={10} nsaba={(item?.score / item?.totalQuestions) * 100}></ProgCircle>
                                        </div>
                                    </div>
                                ))}
                            </div>





                        </div>

                        <div className='cursor-default mt-8 backdrop-blur-xl rounded-xl w-fit m-auto outline-dashed mb-8 outline-2 bg-black/20 outline-white p-5'>
                            <h4 className='m-auto flex gap-4 rtl place-items-center justify-center font-arabicUI2 text-xl md:text-5xl text-center text-white'>
                                مستواك فكل مادة النهاردة
                                <IoBarChart />
                            </h4>
                        </div>

                        {/* Displaying Subject Totals */}

                        <div className='grid cursor-default rtl rtl-grid max-sm:grid-cols-2 gap-4 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 grid-cols-6'>
                            {sortedSubjects.map((subject, index) => (
                                <div key={index} className='md:m-5 h-fit bg-black/15 backdrop-blur-2xl shadow-white/10 outline-dashed outline-white outline-2 shadow-xl p-5 rounded-xl'>
                                    <h4 className='font-arabicUI2 text-center text-white text-xl mb-4'>
                                        {subject === 'ar' && "لغة عربية"}
                                        {subject === 'en' && "لغة انجليزية"}
                                        {subject === 'fr' && "لغة فرنسية"}
                                        {subject === 'chem' && "كيمياء "}
                                        {subject === 'bio' && "احياء "}
                                        {subject === 'ph' && "فيزياء "}
                                        {subject === 'geo' && "جيولوجيا "}
                                    </h4>

                                    {/* Check the subject and render the corresponding image */}
                                    {subject === 'chem' && (
                                        <img src="/chem.jpg" className='m-auto justify-center flex items-center' width={100} height={100} alt="كيمياء" />
                                    )}
                                    {subject === 'ar' && (
                                        <img src="/ar.png" className='m-auto order-1 justify-center flex items-center' width={100} height={100} alt="عربي" />
                                    )}
                                    {subject === 'ph' && (
                                        <img src="/ph.png" className='m-auto justify-center flex items-center' width={100} height={100} alt="فيزياء" />
                                    )}
                                    {subject === 'bio' && (
                                        <img src="/bio2.jpg" className='m-auto justify-center flex items-center' width={100} height={100} alt="أحياء" />
                                    )}
                                    {subject === 'en' && (
                                        <img src="/en.png" className='m-auto justify-center flex items-center' width={100} height={100} alt="إنجليزي" />
                                    )}
                                    {subject === 'fr' && (
                                        <img src="/fr.png" className='m-auto justify-center flex items-center' width={100} height={100} alt="فرنسي" />
                                    )}
                                    {subject === 'geo' && (
                                        <img src="/geo.png" className='m-auto justify-center flex items-center' width={100} height={100} alt="فرنسي" />
                                    )}

                                    <p className='font-arabicUI3  text-center text-lg text-white/80  md:text-3xl my-4 flex justify-center mx-auto'>

                                        {(() => {
                                            const percentage = ((subjectTotals[subject].quizGrade / subjectTotals[subject].numofqus) * 100).toFixed(2);
                                            if (percentage >= 90) {
                                                return "ممتاز ";
                                            } else if (percentage >= 80) {
                                                return "جيد جدا ";
                                            } else if (percentage >= 70) {
                                                return "جيد ";
                                            } else if (percentage >= 60) {
                                                return "مقبول ";
                                            } else {
                                                return "سئ للغاية ";
                                            }
                                        })()}

                                    </p>
                                    <ProgCircle hight={20} nsaba={((subjectTotals[subject].quizGrade / subjectTotals[subject].numofqus) * 100)}></ProgCircle>
                                </div>
                            ))}
                        </div>
                    </div>

                ) }

        </div>

    );
};

export default QuizV;
