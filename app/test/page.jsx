"use client";
import { useEffect, useState } from "react";
import GlobalApi from "../api/GlobalApi";
import { BiSolidPencil } from "react-icons/bi"; // Import icon
import { BsPatchCheckFill } from "react-icons/bs";
import ProgCircle from "../components/ProgCircle";
import Link from "next/link";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';

export default function Quiz() {
    const [questions, setQuestions] = useState([]); // Store the parsed quiz questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Track the user's selected answer
    const [answers, setAnswers] = useState([]); // Store the answers
    const [score, setScore] = useState(0); // Track the user's score
    const [loading, setLoading] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);

    // Fetch quiz data
    useEffect(() => {
        const fetchQuizData = async () => {
            setLoading(true);
            try {
                const data = await GlobalApi.testdata();
                const fileUrl = data?.testnames[0]?.fileOfQus?.url;

                if (!fileUrl) {
                    console.error("File URL not found in API response");
                    setLoading(false);
                    return;
                }

                const textResponse = await fetch(fileUrl);
                const text = await textResponse.text();

                const parsedQuestions = convertTextToJson(text);
                setQuestions(parsedQuestions);

                // Load data from localStorage, if available (do not auto-fill answers when it's a fresh start)
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

        fetchQuizData(); // Fetch the data once on mount
    }, []); // Empty dependency array ensures this runs only once on mount

    const convertTextToJson = (text) => {
        const questions = [];
        const blocks = text.trim().split(/\n(?=\d+\.\s)/); // Split by questions (lines starting with "1.", "2.", etc.)

        blocks.forEach((block) => {
            const lines = block.split("\n").filter(Boolean); // Split into lines and remove empty ones
            const questionMatch = lines[0]?.match(/^\s*\d+\.\s*(.*?)\s*==>\s*(\w)\s*$/);

            if (!questionMatch) return;

            const questionText = questionMatch[1].trim();
            const correctAnswerLetter = questionMatch[2];
            const options = [];
            let correctAnswer = null;

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
            });

            if (questionText && options.length && correctAnswer) {
                questions.push({ question: questionText, options, correctAnswer });
            }
        });

        return questions;
    };

    const handleAnswerSelect = (option) => {
        setSelectedAnswer(option); // Allow changing the answer by updating the selected option
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
                className: 'font-arabicUI3 w-fit m-7 text-lg p-4 rounded-lg shadow-lg',
                });

            return;
        }
    
        // Update answers array
        const updatedAnswers = [...answers];
        const existingAnswerIndex = updatedAnswers.findIndex(
            (ans) => ans.question === questions[currentQuestionIndex].question
        );
    
        if (existingAnswerIndex > -1) {
            updatedAnswers[existingAnswerIndex].answer = selectedAnswer;
        } else {
            updatedAnswers.push({
                question: questions[currentQuestionIndex].question,
                answer: selectedAnswer,
            });
        }
    
        setAnswers(updatedAnswers); // Update answers state
    
        // Update score only if the current answer is correct
        const updatedScore = selectedAnswer.text === questions[currentQuestionIndex].correctAnswer
            ? score + 1
            : score;
    
        setScore(updatedScore);
    
        // Save updated state in localStorage only if the quiz isn't completed
        if (currentQuestionIndex + 1 < questions.length) {
            localStorage.setItem("answers", JSON.stringify(updatedAnswers));
            localStorage.setItem("score", updatedScore);
            localStorage.setItem("currentQuestionIndex", currentQuestionIndex + 1);
        }
    
        // Check if it's the last question
        if (currentQuestionIndex + 1 === questions.length) {
            Swal.fire({
                title: "هل أنت متأكد؟",
                text: "هل ترغب في تسليم الامتحان؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "نعم، تسليم الامتحان",
                cancelButtonText: "لا، العودة",
            }).then((result) => {
                if (result.isConfirmed) {
                    setQuizComplete(true); // Finish the quiz
                    // Clear localStorage when quiz is completed
                    localStorage.removeItem("answers");
                    localStorage.removeItem("score");
                    localStorage.removeItem("currentQuestionIndex");
                } else {
                    // Keep the user on the current question
                    setSelectedAnswer(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            });
        } else {
            // Move to the next question
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    
        setSelectedAnswer(null); // Clear selection for the next question
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    

    useEffect(() => {
        // Restore selected answer for the current question
        const savedAnswer = answers.find(
            (ans) => ans.question === questions[currentQuestionIndex]?.question
        )?.answer || null;
        setSelectedAnswer(savedAnswer);
    }, [currentQuestionIndex, answers]);
    
    const handleClickNumber = (index) => {
        if (selectedAnswer) {
            // Save answer if it exists
            const updatedAnswers = [...answers];
            const existingAnswerIndex = updatedAnswers.findIndex(
                (ans) => ans.question === questions[currentQuestionIndex].question
            );
    
            if (existingAnswerIndex > -1) {
                updatedAnswers[existingAnswerIndex].answer = selectedAnswer;
            } else {
                updatedAnswers.push({
                    question: questions[currentQuestionIndex].question,
                    answer: selectedAnswer,
                });
            }
            setAnswers(updatedAnswers);
            localStorage.setItem("answers", JSON.stringify(updatedAnswers));
        }
    
        // Restore the selected answer for the selected question
        const selectedSavedAnswer = answers.find(
            (ans) => ans.question === questions[index].question
        )?.answer || null;
        setSelectedAnswer(selectedSavedAnswer);
        setCurrentQuestionIndex(index);
    
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
   
    

    const resetQuizData = () => {
        // Clear answers, score, and current question index
        setAnswers([]);
        setScore(0);
        setCurrentQuestionIndex(0);
        localStorage.removeItem('answers');
        localStorage.removeItem('score');
        localStorage.removeItem('currentQuestionIndex');
    };
   

    const displayResult = () => {
        return (
            <div className="bg-quiz2 cursor-default bg-cover rounded-xl p-8 m-4">
                <div className="backdrop-blur-3xl rounded-xl p-6">
                    <h1 className="font-arabicUI3 text-6xl max-sm:text-3xl text-center text-white">
                        نتيجتك: {score}/{questions.length}
                    </h1>
    
                    <div className="m-6">
                        <ProgCircle nsaba={(score / questions.length) * 100}></ProgCircle>
                    </div>
    
                    <div className="grid max-sm:grid-cols-1 grid-cols-3">
                        {questions.map((item, index) => (
                            <div key={index}>
                                <h2
                                    onClick={() => handleClickNumber(index)}
                                    className="cursor-pointer max-sm:text-lg font-arabicUI3 m-5 text-4xl p-4 rounded-lg text-center duration-500 transition h-fit active:ring-4 select-none bg-white text-gray-800"
                                >
                                    {item.question}
                                </h2>
                                {item.options.map((option) => (
                                    <h2
                                        key={option.letter}
                                        className={`cursor-pointer font-arabicUI3 m-5 text-xl p-4 rounded-lg text-center duration-500 transition h-fit active:ring-4 select-none ${
                                            option.text === item.correctAnswer
                                                ? "bg-green-500 text-white"
                                                : answers.find(
                                                      (ans) =>
                                                          ans.question === item.question &&
                                                          ans.answer.text === option.text
                                                  )
                                                ? "bg-red-500 text-white"
                                                : "bg-gray-300 text-black"
                                        }`}
                                    >
                                        {option.text}
                                    </h2>
                                ))}
                            </div>
                        ))}
                    </div>
    
                    <Link href="/">
                        <div className="text-7xl max-sm:text-2xl text-white p-5 flex justify-center mx-auto m-6 font-arabicUI2 bg-white/20 w-fit rounded-xl outline-1 outline-white outline-dashed">
                            <h1>الصفحة الرئيسية</h1>
                        </div>
                    </Link>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className='cursor-default backdrop-blur-xl rounded-xl w-fit m-auto outline-dashed mb-8 outline-2 bg-black/20 outline-white p-5'>
                <h4 className='m-auto flex justify-center place-items-center font-arabicUI2 max-sm:text-3xl text-center gap-4 text-white text-5xl'>
                    <BsPatchCheckFill className='text-4xl'></BsPatchCheckFill>
                    جاري تحميل الاسئلة
                </h4>
                
            </div>
        );
    }

    if (quizComplete) {
        return displayResult();
    }

    if (questions.length === 0) {
        return <p className="text-center text-white">No questions available.</p>;
    }

    return (
        <div className="bg-quiz2 cursor-default bg-cover rounded-xl p-8 m-4">
            <div className="backdrop-blur-xl p-3 px-8 rounded-xl outline-dashed outline-white outline-2">
                <div className="flex justify-end">
                    <h4 className="text-right font-arabicUI3 text-5xl bg-white/10 p-4 w-fit rounded-md flex text-white">
                        <BiSolidPencil /> Quiz
                    </h4>
                </div>

                <div className="mt-8">
                    <h2
                        className={`m-7 col-span-2 order-1 h-fit cursor-pointer leading-normal font-arabicUI3 text-4xl max-sm:mt-6 p-4 rounded-lg max-sm:text-2xl text-center duration-500 transition active:ring-4 select-none bg-white text-gray-800 ${questions[currentQuestionIndex]?.language === 'ar' ? 'rtl' : ''}`}
                    >
                        {questions[currentQuestionIndex]?.question}
                    </h2>

                    <div className="grid max-md:grid-cols-1 grid-cols-2">
                        {questions[currentQuestionIndex]?.options?.map((option) => (
                            <button
                                key={option.letter}
                                className={`mb-7 cursor-pointer max-sm:text-2xl font-arabicUI3 text-4xl m-3 p-4 rounded-lg text-center duration-500 transition active:ring-4 select-none
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

            <div className="mt-10 grid grid-cols-11 max-md:grid-cols-4 max-sm:grid-cols-3 max-lg:grid-cols-5 max-xl:grid-cols-7 gap-3">
                {questions.map((item, index) => (
                    <h2
                        onClick={() => handleClickNumber(index)}
                        className={`mb-7 max-sm:text-2xl cursor-pointer font-arabicUI3 text-4xl p-4 rounded-lg text-center duration-500 transition active:ring-4 select-none
                        ${answers.some((ans) => ans.question === item.question)
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
    );
}
