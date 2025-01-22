"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../api/GlobalApi";
import { BiSolidPencil } from "react-icons/bi"; // Import icon
import { BsPatchCheckFill } from "react-icons/bs";
import ProgCircle from "../components/ProgCircle";
import Link from "next/link";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from "@clerk/nextjs";
import CryptoJS from "crypto-js";


export default function QuizCh({ params }) {

    const { quizid } = React.use(params);
    const { user } = useUser();
    const email = user?.primaryEmailAddress?.emailAddress;




    const [questions, setQuestions] = useState([]); // Store the parsed quiz questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Track the user's selected answer
    const [answers, setAnswers] = useState([]); // Store the answers
    const [score, setScore] = useState(0); // Track the user's score
    const [loading, setLoading] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [quizDetails, setQuizDetalis] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [resultJson, setResultJson] = useState(null); // State for result JSON
    const encryptionKey = 'jdfhaksjdh38457389475fjks46jy6i786kadhfkjsahdfkjash';

    const openModal = (imageUrl) => {
        setCurrentImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        getdata()
    }, [])

    const getdata = () => {

        GlobalApi.quizEn(quizid).then(res => {
            setQuizDetalis(res.dataOfQuizs[0])

        })

    }



    useEffect(() => {
        const fetchQuizData = async () => {
            setLoading(true);
            try {
                const fileUrl = await waitForFileUrl(quizDetails.fileOfQus?.url);

                if (!fileUrl) {
                    console.error("File URL not found in API response");
                    setLoading(false);
                    return;
                }


                const textResponse = await fetch(fileUrl);
                const text = await textResponse.text();

                const parsedQuestions = convertTextToJson(text);
                setQuestions(parsedQuestions);

                // Load data from localStorage, if available
                const savedAnswers = JSON.parse(localStorage.getItem('answers')) || [];
                const savedScore = parseInt(localStorage.getItem('score')) || 0;
                const savedQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex')) || 0;

                setAnswers(savedAnswers);
                setScore(savedScore);
                setCurrentQuestionIndex(savedQuestionIndex);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [quizDetails]);  // Use quizDetails as a dependency to ensure it's updated before fetch


    const waitForFileUrl = (fileUrl) => {
        return new Promise((resolve, reject) => {
            if (fileUrl) {
                resolve(fileUrl);
            } else {
                setTimeout(() => waitForFileUrl(fileUrl).then(resolve), 500); // retry after 500ms
            }
        });
    };


    let idCounter = 1;
    const convertTextToJson = (text) => {
        const questions = [];
        const blocks = text.trim().split(/\n(?=\d+\.\s)/);

        blocks.forEach((block) => {
            const lines = block.split("\n").filter(Boolean);
            const questionMatch = lines[0]?.match(/^\s*\d+\.\s*(.*?)\s*(==>\s*(\w))?\s*$/);

            if (!questionMatch) return;

            const questionText = questionMatch[1].trim();
            const correctAnswerLetter = questionMatch[2]?.trim().replace("==>", "") || '';
            const options = [];
            let correctAnswer = null;
            let imageUrl = null;

            lines.slice(1).forEach((line) => {
                const cleanedLine = line.trim().replace(/\u00A0/g, " ");
                const optionMatch = cleanedLine.match(/^\s*\((\w)\)\s*(.+)$/);

                if (optionMatch) {
                    const optionLetter = optionMatch[1].trim();
                    const optionText = optionMatch[2].trim();
                    options.push({ letter: optionLetter, text: optionText });

                    if (correctAnswerLetter === optionLetter) {
                        correctAnswer = optionText;
                    }
                }

                const imageMatch = cleanedLine.match(/https:\/\/i\.imgur\.com\/[a-zA-Z0-9]+\.png/);
                if (imageMatch) {
                    imageUrl = imageMatch[0];
                }
            });

            if (questionText && options.length && correctAnswer) {
                questions.push({
                    id: idCounter++, // Add a unique ID for each question
                    question: questionText,
                    options,
                    correctAnswer,
                    imageUrl,
                });
            }
        });

        return questions;
    };



    const handleAnswerSelect = (option) => {
        setSelectedAnswer(option);
    };






    const handleNextQuestion = () => {
        if (!selectedAnswer) {
            toast.success(' ❤️ فكر فالسوال وجاوب علي مهلك', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                className: 'font-arabicUI3 w-fit m-7text-lg p-4 rounded-lg shadow-lg',
            });
            return;
        }

        // Update answers array
        const updatedAnswers = [...answers];
        const existingAnswerIndex = updatedAnswers.findIndex(
            (ans) => ans.questionId === questions[currentQuestionIndex]?.id
        );

        if (existingAnswerIndex > -1) {
            updatedAnswers[existingAnswerIndex].answer = selectedAnswer;
        } else {
            updatedAnswers.push({
                questionId: questions[currentQuestionIndex]?.id, // Use question ID
                answer: selectedAnswer,
            });
        }

        setAnswers(updatedAnswers);
        localStorage.setItem('answers', JSON.stringify(updatedAnswers)); // Save to localStorage

        // Update score based on new answer
        const updatedScore = updatedAnswers.filter((ans) => {
            const question = questions.find(q => q.id === ans.questionId);
            return question && ans.answer.text === question.correctAnswer;
        }).length;

        setScore(updatedScore);
        localStorage.setItem('score', updatedScore.toString()); // Save to localStorage

        // Check if it's the last question
        if (currentQuestionIndex + 1 === questions.length) {
            // Ensure no undefined in answeredQuestionIds
            const answeredQuestionIds = updatedAnswers
                .map(ans => ans.questionId)
                .filter(Boolean); // Remove undefined/null values
            const allQuestionIds = questions.map(q => q.id);

            const unansweredQuestions = allQuestionIds.filter(
                id => !answeredQuestionIds.includes(id)
            );

            if (unansweredQuestions.length > 0) {
                Swal.fire({
                    title: "لم يتم الإجابة على جميع الأسئلة",
                    text: `باقي ${unansweredQuestions.length} سؤال لم يتم الإجابة عليه`,
                    icon: "warning",
                    confirmButtonText: "أفهم",
                });
                return;
            }

            Swal.fire({
                title: "هل أنت متأكد؟",
                text: "هل ترغب في تسليم الامتحان؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "نعم، تسليم الامتحان",
                cancelButtonText: "لا، العودة",
            }).then((result) => {
                if (result.isConfirmed) {
                    // Create result JSON
                    const resultData = {
                        userEmail: email,
                        userName: user.fullName,
                        score: updatedScore,
                        totalQuestions: questions.length,
                        quizName: quizDetails.namequiz,
                        sub: quizDetails.subject,
                    };

                    const encryptedResultData = CryptoJS.AES.encrypt(JSON.stringify(resultData), encryptionKey).toString();

                    const saveGrade = async () => {
                        try {
                            await GlobalApi.testSaveQuizres({ encryptedData: encryptedResultData });

                            Swal.fire({
                                title: "تم التسليم بنجاح!",
                                text: "انا فخور بيك انك حاولت مهما كانت النتيجة",
                                icon: "success",
                            });

                            setQuizComplete(true);
                            localStorage.removeItem("answers");
                            localStorage.removeItem("score");
                            localStorage.removeItem("currentQuestionIndex");
                        } catch (error) {
                            console.error("Failed to save grades:", error);
                            Swal.fire({
                                title: "خطأ!",
                                text: "حدث خطأ أثناء حفظ النتائج. حاول مرة أخرى لاحقًا.",
                                icon: "error",
                            });
                        }
                    };
                    saveGrade();
                } else {
                    setSelectedAnswer(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            });
        } else {
            setCurrentQuestionIndex((prevIndex) => {
                const newIndex = prevIndex + 1;
                localStorage.setItem('currentQuestionIndex', newIndex.toString()); // Save to localStorage
                return newIndex;
            });
        }

        setSelectedAnswer(null);
        const questionDiv = document.getElementById("question");
        if (questionDiv) {
            questionDiv.scrollIntoView({ behavior: "smooth" });
        }
    };






    useEffect(() => {
        // Restore selected answer for the current question
        const savedAnswer = answers.find(
            (ans) => ans.questionId === questions[currentQuestionIndex]?.id
        )?.answer || null;
        setSelectedAnswer(savedAnswer);
    }, [currentQuestionIndex, answers]);

    const handleClickNumber = (index) => {
        // تحديث الإجابة المحددة قبل التبديل إلى السؤال الجديد
        if (selectedAnswer) {
            const updatedAnswers = [...answers];
            const existingAnswerIndex = updatedAnswers.findIndex(
                (ans) => ans.questionId === questions[currentQuestionIndex]?.id
            );

            if (existingAnswerIndex > -1) {
                updatedAnswers[existingAnswerIndex].answer = selectedAnswer;
            } else {
                updatedAnswers.push({
                    questionId: questions[currentQuestionIndex]?.id, // إضافة القيمة الافتراضية للسؤال
                    answer: selectedAnswer,
                });
            }

            setAnswers(updatedAnswers);
            localStorage.setItem("answers", JSON.stringify(updatedAnswers)); // Save to localStorage
        }

        // تحديث الإجابة المختارة عند الضغط على رقم السؤال
        const selectedSavedAnswer = answers.find(
            (ans) => ans.questionId === questions[index]?.id
        )?.answer || null;
        setSelectedAnswer(selectedSavedAnswer);
        setCurrentQuestionIndex(index);
        localStorage.setItem('currentQuestionIndex', index.toString()); // Save to localStorage

        const questionDiv = document.getElementById("question");
        if (questionDiv) {
            questionDiv.scrollIntoView({ behavior: "smooth" });
        }
    };



    const displayResult = () => {
        const copyToClipboard = () => {
            if (resultJson) {
                navigator.clipboard.writeText(JSON.stringify(resultJson, null, 2))
                    .then(() => {
                        toast.success('تم نسخ البيانات بنجاح!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            className: 'font-arabicUI3 w-fit m-7 text-lg p-4 rounded-lg shadow-lg',
                        });
                    })
                    .catch((error) => {
                        console.error('Failed to copy text: ', error);
                    });
            }
        };

        return (
            <div className="bg-quiz2 cursor-default bg-cover rounded-xl  م-2 p-1 md:p-8 md:م-4">
                <div className="backdrop-blur-3xl rounded-xl p-6">
                    <h1 className="font-arabicUI3 text-6xl max-sm:text-3xl text-center text-white">
                        نتيجتك {score}/{questions.length}
                    </h1>

                    <div className="m-6">
                        <ProgCircle nsaba={(score / questions.length) * 100}></ProgCircle>
                    </div>

                    <div className="grid max-sm:grid-cols-1 grid-cols-3">
                        {questions.map((item, index) => (
                            <div key={index}>
                                <h2
                                    onClick={() => handleClickNumber(index)}
                                    className="cursor-pointer max-sm:text-lg font-arabicUI3 md:m-5 text-4xl p-4 rounded-lg text-center duration-500 transition h-fit active:ring-4 select-none bg-white text-gray-800"
                                >
                                    {item.question}
                                </h2>

                                {item.options.map((option) => {
                                    // Check if the option is correct or selected
                                    const isCorrect = option.text === item.correctAnswer;
                                    const isSelected = answers.find(
                                        (ans) =>
                                            ans.questionId === item.id &&
                                            ans.answer.text === option.text
                                    );

                                    // Only show correct answers and the selected answers
                                    if (isCorrect || isSelected) {
                                        return (
                                            <h2
                                                key={option.letter}
                                                className={`cursor-pointer font-arabicUI3 m-5 text-xl p-4 rounded-lg text-center duration-500 transition h-fit active:ring-4 select-none 
                                                    ${isCorrect
                                                        ? "bg-green-500 text-white"  // Correct answer styling
                                                        : (isSelected
                                                            ? "bg-red-500 text-white" // Selected wrong answer styling
                                                            : "bg-gray-300 text-black") // Hide other incorrect answers
                                                    }`}
                                            >
                                                {option.text}
                                            </h2>
                                        );
                                    }

                                    return null; // Do not render options that are neither correct nor selected
                                })}
                            </div>
                        ))}
                    </div>



                    <Link href="/">
                        <div className="text-7xl max-sm:text-2xl text-white p-5 flex justify-center mx-auto م-6 font-arabicUI2 bg-white/20 w-fit rounded-xl outline-1 outline-white outline-dashed">
                            <h1>الصفحة الرئيسية</h1>
                        </div>
                    </Link>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-800">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white mx-auto"></div>
                    <h4 className="mt-8 font-arabicUI3 text-4xl text-white">
                        <BsPatchCheckFill className="inline text-5xl mr-2" />
                        جاري تحميل الأسئلة، انتظر قليلًا...
                    </h4>
                </div>
            </div>
        );
    }


    if (quizComplete) {
        return displayResult();
    }

    if (questions.length === 0) {
        return (
            <div className='cursor-default backdrop-blur-xl rounded-xl w-fit م-auto outline-dashed mb-8 outline-2 bg-black/20 outline-white p-5'>
                <h4 className='م-auto flex justify-center place-items-center font-arabicUI2 max-sm:text-3xl text-center gap-4 text-white text-5xl'>
                    <BsPatchCheckFill className='text-4xl'></BsPatchCheckFill>
                    جاري تحميل الاسئلة
                </h4>

            </div>

        )
    }

    return (
        <div>
            {user ? (
                <div className="bg-quiz2 cursor-default bg-cover rounded-xl م-2 p-1 md:p-8 md:م-4">
                    <div className="backdrop-blur-xl p-3 px-8 rounded-xl outline-dashed outline-white outline-2">
                        <div className="flex justify-end">
                            <h4 className="text-right font-arabicUI3 text-lg md:text-5xl bg-white/10 p-4 w-fit rounded-md flex text-white">
                                <BiSolidPencil /> {quizDetails.namequiz}
                            </h4>
                        </div>


                        <div id="question" className="mt-8">

                            {questions[currentQuestionIndex] && questions[currentQuestionIndex]?.imageUrl ? (
                                <div className="grid max-lg:grid-cols-1 items-center grid-cols-3">
                                    <h2 className="md:m-7 col-span-2 text-xl md:text-5xl order-1 h-fit cursor-pointer leading-normal font-arabicUI3  max-sm:mt-6 p-2 md:p-4 rounded-lg  text-center duration-500 transition active:ring-4 select-none bg-white text-gray-800">
                                        {questions[currentQuestionIndex]?.question}
                                    </h2>

                                    <div className="col-span-1 max-sm:w-full rounded-xl">
                                        <img
                                            className="cursor-pointer rounded-xl"
                                            src={questions[currentQuestionIndex]?.imageUrl}
                                            alt="Quiz Image"
                                            width={400}
                                            height={400}
                                            onClick={() => openModal(questions[currentQuestionIndex]?.imageUrl)}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <h2 className="md:m-7 cursor-pointer leading-normal  text-lg md:text-5xl font-arabicUI3  max-sm:mt-6 p-4 rounded-lg max-sm:text-2xl text-center duration-500 transition active:ring-4 select-none bg-white text-gray-800">
                                    {questions[currentQuestionIndex]?.question}
                                </h2>
                            )}

                            {/* Modal for Image Zoom */}
                            {isModalOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={closeModal}>
                                    <div className="relative max-w-5xl max-h-full">
                                        <img
                                            className="max-w-full rounded-lg max-h-full object-contain"
                                            src={currentImage}
                                            alt="Zoomed Image"
                                            onClick={(e) => e.stopPropagation()}  // Prevent closing modal when clicking on the image itself
                                        />
                                        <button
                                            className="z-10 absolute -bottom-20  right-1 p-4 text-2xl font-arabicUI3 text-white bg-gradient-to-r from-red-500 to-red-800 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-blue-300 backdrop-blur-xl focus:outline-none focus:ring-4 focus:ring-blue-500"
                                            onClick={closeModal}
                                        >
                                            اغلاق الصورة
                                        </button>
                                    </div>
                                </div>
                            )}



                            <div className="grid max-md:grid-cols-1  mt-4 grid-cols-2">
                                {questions[currentQuestionIndex]?.options?.map((option) => (
                                    <button
                                        key={option.letter}
                                        className={`mb-7 cursor-pointer text-lg md:text-5xl  font-arabicUI3 md:m-3 p-4 rounded-lg text-center duration-500 transition active:ring-4 select-none
                                ${selectedAnswer?.letter === option.letter
                                                ? "bg-green-400 text-gray-800"
                                                : "text-white bg-gray-800"
                                            }`}
                                        onClick={() => handleAnswerSelect(option)}
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                    <ToastContainer />

                    <div className="mt-10 grid grid-cols-11  max-lg:grid-cols-5 max-xl:grid-cols-7 gap-3">
                        {questions.map((item, index) => (
                            <h2
                                onClick={() => handleClickNumber(index)}
                                className={`mb-7 max-sm:text-2xl cursor-pointer font-arabicUI3 text-4xl p-4 rounded-lg text-center duration-500 transition active:ring-4 select-none
                                        ${answers.some((ans) => ans.questionId === item.id)
                                        ? "bg-green-400 text-gray-800"
                                        : currentQuestionIndex === index
                                            ? "bg-slate-800 text-white"
                                            : "bg-white text-gray-800"}`}
                                key={index}
                            >
                                {index + 1}
                            </h2>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center gap-4">
                        <h2
                            onClick={handleNextQuestion}
                            className={`mb-7 cursor-pointer max-sm:text-2xl max-sm:p-4 w-fit font-arabicUI3 text-5xl m-3 p-8 mx-auto rounded-lg text-center duration-500 transition active:ring-4 select-none bg-white text-gray-800`}
                        >
                            {currentQuestionIndex + 1 === questions.length ? "تسليم الامتحان" : "السوال التالي"}
                        </h2>
                    </div>
                </div>
            )

                : (
                    <div className="flex justify-center items-center h-screen bg-gray-800">
                        <h1 className="font-arabicUI3 text-4xl text-white">
                            من فضلك سجل الدخول لبدء الامتحان
                        </h1>
                    </div>
                )

            }
        </div>


    )
}