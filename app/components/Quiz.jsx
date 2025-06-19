"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../api/GlobalApi";
import { BiSolidPencil } from "react-icons/bi";
import { BsPatchCheckFill, BsLightningChargeFill, BsClock, BsCheckCircleFill } from "react-icons/bs";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import ProgCircle from "./ProgCircle";
import Link from "next/link";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import CryptoJS from "crypto-js";

// Function to format time in minutes and seconds
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function Quiz({ params }) {
    const { quizid } = React.use(params);
    console.log(params)
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
    const [loading, setLoading] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [quizDetails, setQuizDetalis] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [resultJson, setResultJson] = useState(null);
    const [timeSpent, setTimeSpent] = useState(() => {
        // Initialize from localStorage or start at 0
        const saved = localStorage.getItem('timeSpent');
        return saved ? parseInt(saved) : 0;
    });
    const [bookmarked, setBookmarked] = useState([]);
    const [streakCount, setStreakCount] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const encryptionKey = 'jdfhaksjdh38457389475fjks46jy6i786kadhfkjsahdfkjash';

    // Timer effect: increments timeSpent every second while quiz is active
    useEffect(() => {
        if (!quizComplete && questions.length > 0) {
            const timer = setInterval(() => {
                setTimeSpent(prev => {
                    const newValue = prev + 1;
                    localStorage.setItem('timeSpent', newValue.toString());
                    return newValue;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [quizComplete, questions]);


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

    // Helper to determine which API to use based on subject
    const getApiMethod = () => {
        console.log('Current quizid:', quizid); // Log the quiz ID

        // First check if we can determine the subject from the URL
        const path = window.location.pathname;
        console.log('Current path:', path); // Log the current path

        // Check URL path first
        if (path.startsWith('/bio/')) return GlobalApi.quizbio;
        if (path.startsWith('/english/')) return GlobalApi.quizEn;
        if (path.startsWith('/chem/')) return GlobalApi.quizCh;
        if (path.startsWith('/phys/')) return GlobalApi.quizPh;
        if (path.startsWith('/geo/')) return GlobalApi.quizgeo;
        if (path.startsWith('/french/')) return GlobalApi.quizFr;
        if (path.startsWith('/arabic/')) return GlobalApi.quizAr;

        // If no match in URL, check quizDetails subject
        if (quizDetails && quizDetails.subject) {
            console.log('Quiz subject:', quizDetails.subject); // Log the subject
            if (quizDetails.subject.toLowerCase().includes('bio')) return GlobalApi.quizbio;
            if (quizDetails.subject.toLowerCase().includes('eng')) return GlobalApi.quizEn;
            if (quizDetails.subject.toLowerCase().includes('chem')) return GlobalApi.quizCh;
            if (quizDetails.subject.toLowerCase().includes('phys')) return GlobalApi.quizPh;
            if (quizDetails.subject.toLowerCase().includes('geo')) return GlobalApi.quizgeo;
            if (quizDetails.subject.toLowerCase().includes('fr')) return GlobalApi.quizFr;
            if (quizDetails.subject.toLowerCase().includes('ar')) return GlobalApi.quizAr;
        }

        // As a last resort, try to determine from quizid prefix
        if (quizid) {
            if (quizid.toLowerCase().startsWith('bio')) return GlobalApi.quizbio;
            if (quizid.toLowerCase().startsWith('eng')) return GlobalApi.quizEn;
            if (quizid.toLowerCase().startsWith('chem')) return GlobalApi.quizCh;
            if (quizid.toLowerCase().startsWith('phys')) return GlobalApi.quizPh;
            if (quizid.toLowerCase().startsWith('geo')) return GlobalApi.quizgeo;
            if (quizid.toLowerCase().startsWith('fr')) return GlobalApi.quizFr;
            if (quizid.toLowerCase().startsWith('ar')) return GlobalApi.quizAr;
        }

        console.log('Defaulting to English API'); // Log when defaulting
        // Default to English if nothing else matches
        return GlobalApi.quizEn;
    };

    const getdata = () => {
        const apiMethod = getApiMethod();
        console.log('Selected API method:', apiMethod.name); // Log which API method is being used
        apiMethod(quizid).then(res => {
            console.log('API Response:', res); // Log the API response
            if (!res || !res.dataOfQuizs || !res.dataOfQuizs[0]) {
                console.error('Invalid API response structure');
                return;
            }
            setQuizDetalis(res.dataOfQuizs[0])
        }).catch(error => {
            console.error('API Error:', error); // Log any API errors
        });
    }

    useEffect(() => {
        const fetchQuizData = async () => {
            setLoading(true);
            try {
                console.log('Quiz Details:', quizDetails); // Log quiz details before fetching file
                const fileUrl = await waitForFileUrl(quizDetails.fileOfQus?.url);
                console.log('File URL:', fileUrl); // Log the file URL

                if (!fileUrl) {
                    console.error("File URL not found in API response");
                    setLoading(false);
                    return;
                }

                const textResponse = await fetch(fileUrl);
                const text = await textResponse.text();
                console.log('Quiz Text Content:', text.substring(0, 200)); // Log first 200 chars of content

                const parsedQuestions = convertTextToJson(text);
                console.log('Parsed Questions:', parsedQuestions.length); // Log number of parsed questions
                setQuestions(parsedQuestions);

                // Load data from localStorage, if available
                const savedAnswers = JSON.parse(localStorage.getItem('answers')) || [];
                const savedAnsweredQuestions = new Set(JSON.parse(localStorage.getItem('answeredQuestions')) || []);

                // Recalculate score from saved answers
                const calculatedScore = savedAnswers.filter((ans) => {
                    const question = parsedQuestions.find(q => q.id === ans.questionId);
                    return question && ans.answer.text === question.correctAnswer;
                }).length;

                setAnswers(savedAnswers);
                setAnsweredQuestions(savedAnsweredQuestions);
                setScore(calculatedScore);
                setCurrentQuestionIndex(parseInt(localStorage.getItem('currentQuestionIndex')) || 0);

                // Reset timeSpent when starting a new quiz
                if (savedAnswers.length === 0) {
                    setTimeSpent(0);
                    localStorage.setItem('timeSpent', '0');
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
                setLoading(false);
            }
        };

        if (quizDetails?.fileOfQus?.url) {
            fetchQuizData();
        }
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
            } Swal.fire({
                title: isSaving ? "جاري حفظ النتائج..." : "هل أنت متأكد؟",
                text: isSaving ? "برجاء الانتظار..." : "هل ترغب في تسليم الامتحان؟",
                icon: isSaving ? "info" : "warning",
                showCancelButton: !isSaving,
                allowOutsideClick: !isSaving,
                allowEscapeKey: !isSaving,
                confirmButtonText: isSaving ? "جاري الحفظ..." : "نعم، تسليم الامتحان",
                cancelButtonText: "لا، العودة",
                didOpen: () => {
                    if (isSaving) {
                        Swal.showLoading();
                    }
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    // Create result JSON
                    const resultData = {

                        score: updatedScore,
                        totalQuestions: questions.length,
                        quizName: quizDetails.namequiz,
                        sub: quizDetails.subject,
                        timeSpent: timeSpent,
                        formattedTime: formatTime(timeSpent),
                    };

                    const encryptedResultData = CryptoJS.AES.encrypt(JSON.stringify(resultData), encryptionKey).toString();

                    const saveGrade = async () => {
                        setIsSaving(true);
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
                            localStorage.removeItem("timeSpent");
                        } catch (error) {
                            console.error("Failed to save grades:", error);
                            Swal.fire({
                                title: "خطأ!",
                                text: "حدث خطأ أثناء حفظ النتائج. حاول مرة أخرى لاحقًا.",
                                icon: "error",
                            });
                        } finally {
                            setIsSaving(false);
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
        return (
            <div className="min-h-screen bg-slate-950 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 p-6 md:p-8">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-slate-800/80 p-3 rounded-xl">
                                    <BsPatchCheckFill className="text-3xl text-slate-400" />
                                </div>
                                <h4 className="text-xl md:text-3xl text-slate-200 font-arabicUI3">
                                    {quizDetails.namequiz}
                                </h4>
                            </div>

                            <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-600">
                                <h1 className="font-arabicUI3 text-3xl md:text-6xl text-center text-slate-200 mb-4">
                                    نتيجتك <span className="text-blue-400">{score}</span>/<span className="text-slate-400">{questions.length}</span>
                                </h1>
                                <div className="flex justify-center">
                                    <div className="w-48 md:w-64">
                                        <ProgCircle nsaba={(score / questions.length) * 100} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {questions.map((item) => (
                                    <div key={item.id} className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-600 hover:border-blue-500/50 transition-all duration-300">
                                        <h2 className="text-lg md:text-xl text-slate-200 mb-4 font-arabicUI3">{item.question}</h2>
                                        {item.imageUrl && (
                                            <img
                                                src={item.imageUrl}
                                                alt="Question Image"
                                                className="w-full h-auto rounded-xl mb-4 border border-slate-600"
                                            />
                                        )}
                                        <div className="space-y-3">
                                            {item.options.map((option) => {
                                                const isCorrect = option.text === item.correctAnswer;
                                                const isSelected = answers.find(
                                                    (ans) => ans.questionId === item.id && ans.answer.text === option.text
                                                );

                                                if (isCorrect || isSelected) {
                                                    return (
                                                        <div
                                                            key={option.letter}
                                                            className={`p-3 rounded-lg backdrop-blur-sm ${isCorrect
                                                                ? "bg-green-500/10 text-green-300 border border-green-500/30"
                                                                : isSelected
                                                                    ? "bg-red-500/10 text-red-300 border border-red-500/30"
                                                                    : "bg-slate-700/30 text-slate-300"
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-arabicUI3 text-sm md:text-base">{option.text}</span>
                                                                {isCorrect && <BsCheckCircleFill className="text-green-400" />}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link href="/" className="block">
                                <div className="bg-slate-800/80 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-slate-600 
                                    hover:border-blue-500/50 transition-all duration-300 hover:scale-105 text-center">
                                    <h1 className="text-2xl md:text-4xl text-slate-200 font-arabicUI2">الصفحة الرئيسية</h1>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950">
                <div className="h-screen flex items-center justify-center">
                    <div className="relative bg-slate-900/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-slate-700">
                        <div className="flex flex-col items-center gap-6">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full border-4 border-slate-600 animate-spin border-t-slate-400"></div>
                                <BsPatchCheckFill className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-slate-400" />
                            </div>
                            <h4 className="font-arabicUI3 text-2xl text-slate-200 text-center">
                                جاري تحميل الأسئلة...
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950">
                <div className="h-screen flex items-center justify-center">
                    <div className="bg-slate-900/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-slate-700">
                        <h4 className="font-arabicUI2 text-3xl text-slate-200 flex items-center gap-3">
                            <div className="animate-pulse">
                                <BsPatchCheckFill className="text-slate-400" />
                            </div>
                            جاري تحميل الاسئلة
                        </h4>
                    </div>
                </div>
            </div>
        );
    }

    const toggleBookmark = (questionId) => {
        setBookmarked(prev => {
            if (prev.includes(questionId)) {
                return prev.filter(id => id !== questionId);
            }
            return [...prev, questionId];
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 py-8 px-4 md:px-8">
            {quizComplete ? (
                displayResult()
            ) : (
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Stats Bar */}
                    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-800/80 p-4 rounded-xl flex items-center gap-3">
                                <BsClock className="text-2xl text-slate-400" />
                                <div>
                                    <p className="text-slate-400 text-sm font-arabicUI2">Time Spent</p>
                                    <p className="text-slate-200 font-bold font-arabicUI2">{formatTime(timeSpent)}</p>
                                </div>
                            </div>
                            <div className="bg-slate-800/80 p-4 rounded-xl flex items-center gap-3">
                                <BsLightningChargeFill className="text-2xl text-amber-400" />
                                <div>
                                    <p className="text-slate-400 text-sm font-arabicUI2">Streak</p>
                                    <p className="text-slate-200 font-bold font-arabicUI2">{streakCount}🔥</p>
                                </div>
                            </div>
                            <div className="bg-slate-800/80 p-4 rounded-xl flex items-center gap-3">
                                <BsCheckCircleFill className="text-2xl text-emerald-400" />
                                <div>
                                    <p className="text-slate-400 text-sm font-arabicUI2">Progress</p>
                                    <p className="text-slate-200 font-bold font-arabicUI2">{answers.length}/{questions.length}</p>
                                </div>
                            </div>
                            <div className="bg-slate-800/80 p-4 rounded-xl flex items-center gap-3">
                                <FaBookmark className="text-2xl text-blue-400" />
                                <div>
                                    <p className="text-slate-400 text-sm font-arabicUI2">Saved</p>
                                    <p className="text-slate-200 font-bold font-arabicUI2">{bookmarked.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Quiz Content */}
                    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-slate-800/80 p-2 sm:p-3 rounded-xl">
                                    <BiSolidPencil className="text-2xl sm:text-3xl text-slate-400" />
                                </div>
                                <h4 className="text-lg sm:text-xl md:text-3xl text-slate-200 font-arabicUI3">
                                    {quizDetails.namequiz}
                                </h4>
                            </div>
                            <div className="flex gap-2 sm:gap-4 items-center w-full sm:w-auto flex-wrap justify-end">
                                <div className="bg-slate-800/80 px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2">
                                    <BsClock className="text-slate-400 text-lg sm:text-xl" />
                                    <span className="text-slate-200 font-arabicUI3 whitespace-nowrap text-sm sm:text-base">
                                        {formatTime(timeSpent)}
                                    </span>
                                </div>
                                <div className="bg-slate-800/80 px-3 sm:px-6 py-2 sm:py-3 rounded-xl flex items-center gap-3 flex-1 sm:flex-none">
                                    <div className="h-2.5 w-full sm:w-36 md:w-48 bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                                            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                        >
                                        </div>
                                    </div>
                                    <span className="text-slate-200 font-arabicUI3 whitespace-nowrap text-sm sm:text-base">
                                        {currentQuestionIndex + 1} / {questions.length}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Question */}
                        <div id="question" className="mb-8">
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => toggleBookmark(questions[currentQuestionIndex]?.id)}
                                    className="text-2xl text-slate-400 hover:text-slate-300 transition-colors"
                                >
                                    {bookmarked.includes(questions[currentQuestionIndex]?.id) ? (
                                        <FaBookmark className="text-blue-400" />
                                    ) : (
                                        <FaRegBookmark />
                                    )}
                                </button>
                            </div>
                            {questions[currentQuestionIndex] && questions[currentQuestionIndex]?.imageUrl ? (<div className="flex flex-col gap-8">
                                <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-600">
                                    <h2 className="text-2xl md:text-4xl font-arabicUI3 text-slate-200 leading-relaxed">
                                        {questions[currentQuestionIndex]?.question}
                                    </h2>
                                </div>                                    <div className="w-full">
                                    <div
                                        className="relative group max-w-4xl mx-auto cursor-zoom-in"
                                        onClick={() => openModal(questions[currentQuestionIndex]?.imageUrl)}
                                    >
                                        <img
                                            className="w-full h-auto rounded-2xl transition-all duration-300 transform group-hover:scale-105 shadow-lg border border-slate-600 object-contain max-h-[600px]"
                                            src={questions[currentQuestionIndex]?.imageUrl}
                                            alt="Quiz Image"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-4">
                                            <span className="text-slate-200 text-sm font-arabicUI3">اضغط للتكبير</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ) : (
                                <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-600">
                                    <h2 className="text-2xl md:text-4xl font-arabicUI3 text-slate-200 leading-relaxed">
                                        {questions[currentQuestionIndex]?.question}
                                    </h2>
                                </div>
                            )}
                        </div>

                        {/* Options */}
                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                            {questions[currentQuestionIndex]?.options?.map((option) => (
                                <button
                                    key={option.letter}
                                    onClick={() => handleAnswerSelect(option)}
                                    className={`group relative overflow-hidden p-6 rounded-xl text-xl md:text-2xl font-arabicUI3 transition-all duration-300 ${selectedAnswer?.letter === option.letter
                                        ? "bg-slate-700 text-white shadow-lg border-2 border-blue-500/50"
                                        : "bg-slate-800/80 text-slate-200 hover:bg-slate-800 border border-slate-600"
                                        }`}
                                >
                                    <span className="relative z-10">{option.text}</span>
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 transform transition-transform duration-500 ${selectedAnswer?.letter === option.letter ? 'translate-x-0' : '-translate-x-full'
                                            } group-hover:translate-x-0`}
                                    ></div>
                                </button>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between items-center gap-4">
                            <button
                                onClick={() => {
                                    if (currentQuestionIndex > 0) {
                                        setCurrentQuestionIndex(prev => {
                                            const newIndex = prev - 1;
                                            localStorage.setItem('currentQuestionIndex', newIndex.toString());
                                            return newIndex;
                                        });
                                        setSelectedAnswer(answers.find(
                                            (ans) => ans.questionId === questions[currentQuestionIndex - 1]?.id
                                        )?.answer || null);
                                    }
                                }}
                                disabled={currentQuestionIndex === 0}
                                className={`relative overflow-hidden group px-8 py-4 rounded-xl text-lg font-arabicUI3 transition-all duration-300
                                    ${currentQuestionIndex === 0
                                        ? "bg-slate-800/50 text-slate-600 cursor-not-allowed"
                                        : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600 hover:border-blue-500/50"}`}
                            >
                                السؤال السابق
                            </button>

                            {currentQuestionIndex + 1 === questions.length && answers.length === questions.length ? (
                                <button
                                    onClick={handleNextQuestion}
                                    className="relative overflow-hidden group bg-green-600 text-white text-xl md:text-2xl font-arabicUI3 px-12 py-5 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-pulse border-2 border-green-500/50"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        تسليم الامتحان <BsCheckCircleFill className="text-2xl" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </button>
                            ) : (
                                <button
                                    onClick={handleNextQuestion}
                                    className="relative overflow-hidden group bg-blue-600 text-white text-xl md:text-2xl font-arabicUI3 px-12 py-5 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-blue-500/50"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        السؤال التالي {selectedAnswer && <BsCheckCircleFill className="text-2xl" />}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Image Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-slate-950/95 flex items-center justify-center z-50" onClick={closeModal}>
                            <div className="relative max-w-5xl max-h-[90vh] m-4">
                                <div className="relative group">
                                    <img
                                        className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-slate-600"
                                        src={currentImage}
                                        alt="Zoomed Image"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                                </div>
                                <button
                                    className="absolute -bottom-16 right-1/2 transform translate-x-1/2 text-white bg-slate-800 hover:bg-slate-700 px-8 py-4 rounded-xl font-arabicUI3 text-lg transition-all duration-300 hover:scale-105 border border-slate-600 hover:border-blue-500/50"
                                    onClick={closeModal}
                                >
                                    اغلاق الصورة
                                </button>
                            </div>
                        </div>
                    )}

                    <ToastContainer />
                    {/* Question Navigation */}
                    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 p-6 md:p-8 mb-6">
                        <h4 className="text-xl text-slate-200 font-arabicUI3 mb-4">سجل الأسئلة</h4>
                        <div className="flex flex-wrap gap-3">
                            {questions.map((question, index) => {
                                const isAnswered = answers.some(ans => ans.questionId === question.id);
                                return (
                                    <button
                                        key={question.id}
                                        onClick={() => handleClickNumber(index)}
                                        className={`w-10 h-10 rounded-lg font-arabicUI3 transition-all duration-300 flex items-center justify-center
                                            ${currentQuestionIndex === index
                                                ? 'bg-blue-500 text-white scale-110'
                                                : isAnswered
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}