'use client'
import React, { useEffect, useState } from 'react'
import { FaClipboardList } from 'react-icons/fa'
import GlobalApi from '../api/GlobalApi'
import CryptoJS from 'crypto-js';

const GreatToday = () => {
    const [nameofstudent, setNameOfStudends] = useState([])
    const decryptionKey = 'jdfhaksjdh38457389475fjks46jy6i786kadhfkjsahdfkjash';

    useEffect(() => {
        greatPeople()
    }, [])

    const greatPeople = () => {
        GlobalApi.vquiz().then(res => {

            // Decrypt the encrypted quiz data
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

            setNameOfStudends(decryptedQuiz); // Store decrypted data in quiz state
        });
    };

    const getFirstTwoWords = (name) => {
        return name.split(" ").slice(0, 2).join(" ");
    };

    const userGrades = nameofstudent.reduce((acc, curr) => {
        if (!acc[curr.userEmail]) {
            acc[curr.userEmail] = {
                userName: curr.userName,
                userEmail: curr.userEmail,
                totalQuizGrade: 0,
            };
        }
        acc[curr.userEmail].totalQuizGrade += curr.score; // Use 'score' instead of 'quizGrade'
        return acc;
    }, {});

    // Convert the object into an array and sort by totalQuizGrade in descending order
    const sortedGrades = Object.values(userGrades).sort(
        (a, b) => b.totalQuizGrade - a.totalQuizGrade
    );

    // Get the top 3 users
    const top3Users = sortedGrades.slice(0, 3);

    return (
        <div className="shadow-2xl mt-6 bg-non3 bg-blue-700 selection:bg-blue-600 selection:text-white bg-cover max-w-full lg:max-w-md md:max-h-full  outline-dashed outline-offset-2 outline-blue-500  p-6 rounded-xl">
            <h1 className="font-arabicUI2 m-auto flex justify-center text-white text-3xl md:text-5xl">
                <FaClipboardList />
                عظماء اليوم
            </h1>
            <div className="mt-6">
                {
                    top3Users ? (
                        top3Users.map((user, index) => (
                            <li key={index}
                                className="  bg-white hover:scale-110 transition  bg-cover outline-dashed outline-2 outline-offset-2 outline-white p-3 flex justify-between mt-4 font-arabicUI2 rounded-xl text-xl md:text-2xl text-blue-800">
                                <h3 className='  rtl'>
                                    {user.totalQuizGrade}&nbsp; نقطة
                                </h3>
                                <h3 className=' font-arabicUI3 '>{getFirstTwoWords(user.userName)}</h3>
                            </li>
                        ))
                    ) : (
                        <li key={index}
                            className=" bg-white w-full h-full  bg-cover outline-dashed outline-2 outline-offset-2 outline-white p-3 flex justify-between mt-4 font-arabicUI2 rounded-xl text-xl md:text-2xl text-blue-800">
                        </li>
                    )
                }
            </div>
        </div>
    )
}

export default GreatToday