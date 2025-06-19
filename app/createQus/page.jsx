"use client";
import React, { useState, useEffect } from 'react';
import { BsPatchCheckFill, BsCheckCircleFill, BsTrash, BsPencilFill } from 'react-icons/bs';
import { BiSolidPencil } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';

const CreateQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [pinnedImageUrl, setPinnedImageUrl] = useState('');
    const [isPinned, setIsPinned] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({
        question: 'اختر الاجابة الصحيحة ؟',
        options: {
            a: 'أ',
            b: 'ب',
            c: 'ج',
            d: 'د'
        },
        correctAnswer: 'a',
        imageUrl: ''
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [pastedText, setPastedText] = useState('');

    // Load questions from localStorage on initial render
    useEffect(() => {
        const savedQuestions = localStorage.getItem('createdQuestions');
        if (savedQuestions) {
            setQuestions(JSON.parse(savedQuestions));
        }
    }, []);

    // Save questions to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('createdQuestions', JSON.stringify(questions));
    }, [questions]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('option_')) {
            const option = name.split('_')[1];
            setCurrentQuestion(prev => ({
                ...prev,
                options: {
                    ...prev.options,
                    [option]: value
                }
            }));
        } else if (name === 'imageUrl') {
            setCurrentQuestion(prev => ({
                ...prev,
                imageUrl: value
            }));
            if (isPinned) {
                setPinnedImageUrl(value);
            }
        } else {
            setCurrentQuestion(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handlePinToggle = () => {
        setIsPinned(!isPinned);
        if (!isPinned) {
            setPinnedImageUrl(currentQuestion.imageUrl);
        }
    };

    const addQuestion = (e) => {
        e.preventDefault();
        setQuestions(prev => [...prev, currentQuestion]);
        setCurrentQuestion(prev => ({
            question: 'اختر الاجابة الصحيحة ؟',
            options: {
                a: 'أ',
                b: 'ب',
                c: 'ج',
                d: 'د'
            },
            correctAnswer: 'a',
            imageUrl: isPinned ? pinnedImageUrl : ''
        }));
    };

    const generateText = () => {
        return questions.map((q, index) => {
            const questionNumber = index + 1;
            return `${questionNumber}. ${q.question} ==>${q.correctAnswer}
(a) ${q.options.a}
(b) ${q.options.b}
(c) ${q.options.c}
(d) ${q.options.d}${q.imageUrl ? `\nimage==>${q.imageUrl}` : ''}\n`;
        }).join('\n');
    };

    const copyToClipboard = () => {
        const text = generateText();
        navigator.clipboard.writeText(text);
        alert('تم نسخ النص إلى الحافظة!');
    };

    const handleCorrectAnswerEdit = (index, newAnswer) => {
        setQuestions(prev => prev.map((q, i) =>
            i === index ? { ...q, correctAnswer: newAnswer } : q
        ));
        setEditingIndex(null);
    };

    const deleteQuestion = (indexToDelete) => {
        if (window.confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
            setQuestions(prev => prev.filter((_, index) => index !== indexToDelete));
        }
    };

    const deleteAllQuestions = () => {
        const confirmDelete = window.confirm('هل أنت متأكد من حذف جميع الأسئلة؟ لا يمكن التراجع عن هذا الإجراء.');
        if (confirmDelete) {
            setQuestions([]);
            localStorage.removeItem('createdQuestions');
        }
    };

    const parseQuestionText = () => {
        try {
            // Split by newlines and filter empty lines
            const lines = pastedText.split('\n').filter(line => line.trim());

            // First line contains the question (remove the number if present)
            const question = lines[0].replace(/^\d+\s*/, '').trim();

            // Initialize options object
            const options = {
                a: '',
                b: '',
                c: '',
                d: ''
            };

            // Process each line that starts with parentheses or Arabic letters
            lines.slice(1).forEach(line => {
                const trimmedLine = line.trim();
                // Match different possible formats
                if (trimmedLine.match(/^[)]\s*أ[)]|^أ-|^\(أ\)|^أ\./)) {
                    options.a = trimmedLine.replace(/^[)]\s*أ[)]|^أ-|^\(أ\)|^أ\./, '').trim();
                }
                if (trimmedLine.match(/^[)]\s*ب[)]|^ب-|^\(ب\)|^ب\./)) {
                    options.b = trimmedLine.replace(/^[)]\s*ب[)]|^ب-|^\(ب\)|^ب\./, '').trim();
                }
                if (trimmedLine.match(/^[)]\s*ج[)]|^ج-|^\(ج\)|^ج\./)) {
                    options.c = trimmedLine.replace(/^[)]\s*ج[)]|^ج-|^\(ج\)|^ج\./, '').trim();
                }
                if (trimmedLine.match(/^[)]\s*د[)]|^د-|^\(د\)|^د\./)) {
                    options.d = trimmedLine.replace(/^[)]\s*د[)]|^د-|^\(د\)|^د\./, '').trim();
                }
            });

            // Clean up the text by removing any special characters
            const cleanText = (text) => {
                return text
                    .replace(/[٠-٩]/g, '') // Remove Arabic numerals
                    .replace(/\s+/g, ' ')   // Replace multiple spaces with single space
                    .replace(/\u200F/g, '') // Remove RIGHT-TO-LEFT MARK
                    .replace(/\u200E/g, '') // Remove LEFT-TO-RIGHT MARK
                    .trim();
            };

            // Update the current question with cleaned text
            setCurrentQuestion(prev => ({
                ...prev,
                question: cleanText(question),
                options: {
                    a: cleanText(options.a),
                    b: cleanText(options.b),
                    c: cleanText(options.c),
                    d: cleanText(options.d)
                }
            }));

            // Clear the pasted text
            setPastedText('');
        } catch (error) {
            console.error('Error parsing question:', error);
            alert('حدث خطأ في تحليل النص. يرجى التأكد من تنسيق النص بشكل صحيح.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-slate-800/80 p-3 rounded-xl">
                            <BiSolidPencil className="text-3xl text-slate-400" />
                        </div>
                        <h4 className="text-xl md:text-3xl text-slate-200 font-arabicUI3">
                            إنشاء أسئلة الاختيار من متعدد
                        </h4>
                    </div>

                    {/* Question Form */}
                    <form onSubmit={addQuestion} className="space-y-6">
                        <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-600">
                            <label className="block text-slate-200 text-lg mb-2 font-arabicUI3">الصق السؤال كاملاً هنا</label>
                            <textarea
                                value={pastedText}
                                onChange={(e) => setPastedText(e.target.value)}
                                className="w-full bg-slate-700/50 text-slate-200 rounded-xl p-4 border border-slate-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 mb-3"
                                dir="rtl"
                                rows={6} placeholder="الصق السؤال كاملاً هنا مثال:
1 حدد المجال الذي يُعد أساسًا لتعزيز الاستدامة الاقتصادية والبيئية.
)أ( الاجتماعي.
)ب( التكنولوجي.
)ج( البيئي.
)د( الاقتصادي."
                            />
                            <button
                                type="button"
                                onClick={parseQuestionText}
                                className="w-full bg-indigo-600/80 hover:bg-indigo-700/80 text-white text-lg font-arabicUI3 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl border border-indigo-500/50"
                            >
                                توزيع النص إلى الحقول
                            </button>
                        </div>

                        <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-600">
                            <label className="block text-slate-200 text-lg mb-2 font-arabicUI3">السؤال</label>
                            <input
                                type="text"
                                name="question"
                                value={currentQuestion.question}
                                onChange={handleInputChange}
                                className="w-full bg-slate-700/50 text-slate-200 rounded-xl p-4 border border-slate-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                                required
                                dir="rtl"
                                placeholder="اكتب السؤال هنا..."
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {['a', 'b', 'c', 'd'].map((option) => (
                                <div key={option} className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-600">
                                    <label className="block text-slate-200 text-lg mb-2 font-arabicUI3">
                                        الاختيار {option}
                                    </label>
                                    <input
                                        type="text"
                                        name={`option_${option}`}
                                        value={currentQuestion.options[option]}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-700/50 text-slate-200 rounded-xl p-4 border border-slate-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                                        required
                                        dir="rtl"
                                        placeholder={`اكتب الاختيار ${option} هنا...`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-600">
                            <label className="block text-slate-200 text-lg mb-2 font-arabicUI3">الإجابة الصحيحة</label>
                            <select
                                name="correctAnswer"
                                value={currentQuestion.correctAnswer}
                                onChange={handleInputChange}
                                className="w-full bg-slate-700/50 text-slate-200 rounded-xl p-4 border border-slate-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                            >
                                <option value="a">a</option>
                                <option value="b">b</option>
                                <option value="c">c</option>
                                <option value="d">d</option>
                            </select>
                        </div>

                        <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-600">
                            <label className="block text-slate-200 text-lg mb-2 font-arabicUI3">رابط الصورة (اختياري)</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={currentQuestion.imageUrl}
                                onChange={handleInputChange}
                                className="w-full bg-slate-700/50 text-slate-200 rounded-xl p-4 border border-slate-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                                placeholder="https://i.imgur.com/example.png"
                                dir="ltr"
                            />
                            <div className="mt-4 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handlePinToggle}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isPinned ? 'bg-green-500' : 'bg-slate-600'
                                        }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isPinned ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                                <span className="text-slate-300 text-sm font-arabicUI3">
                                    {isPinned ? 'تثبيت رابط الصورة للأسئلة التالية' : 'تثبيت رابط الصورة'}
                                </span>
                            </div>
                            {isPinned && pinnedImageUrl && (
                                <div className="mt-2 text-green-400 text-sm">
                                    سيتم استخدام نفس رابط الصورة في الأسئلة التالية
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="relative overflow-hidden group bg-blue-600 text-white w-full text-xl md:text-2xl font-arabicUI3 px-12 py-5 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-blue-500/50"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                إضافة السؤال <BsCheckCircleFill className="text-2xl" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </button>
                    </form>
                </div>

                {/* Questions List */}
                {questions.length > 0 && (
                    <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-slate-800/80 p-3 rounded-xl">
                                    <BsPatchCheckFill className="text-3xl text-slate-400" />
                                </div>
                                <h4 className="text-xl md:text-3xl text-slate-200 font-arabicUI3">
                                    الأسئلة المضافة: {questions.length}
                                </h4>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={deleteAllQuestions}
                                    className="relative overflow-hidden group bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-arabicUI3 transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-red-500/50 flex items-center gap-2"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <FiTrash2 className="text-xl" />
                                        حذف الكل
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className="relative overflow-hidden group bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-arabicUI3 transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-green-500/50"
                                >
                                    <span className="relative z-10">نسخ جميع الأسئلة</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {questions.map((q, index) => (
                                <div key={index} className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-600 relative group">
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <button
                                            onClick={() => deleteQuestion(index)}
                                            className="p-2 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all duration-300 border border-red-500/30"
                                            title="حذف السؤال"
                                        >
                                            <BsTrash className="text-xl" />
                                        </button>
                                        <button
                                            onClick={() => setEditingIndex(index)}
                                            className="p-2 bg-blue-500/10 text-blue-400 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-blue-500/20 transition-all duration-300 border border-blue-500/30"
                                            title="تعديل الإجابة الصحيحة"
                                        >
                                            <BsPencilFill className="text-xl" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-lg font-arabicUI3">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-xl text-slate-200 font-arabicUI3">{q.question}</h3>
                                    </div>

                                    {editingIndex === index ? (
                                        <div className="mb-4 bg-slate-700/30 p-4 rounded-xl border border-blue-500/30">
                                            <label className="block text-slate-200 text-lg mb-2 font-arabicUI3">اختر الإجابة الصحيحة</label>
                                            <div className="flex gap-2 flex-wrap">
                                                {['a', 'b', 'c', 'd'].map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => handleCorrectAnswerEdit(index, option)}
                                                        className={`px-6 py-3 rounded-xl text-lg font-arabicUI3 transition-all duration-300 ${q.correctAnswer === option
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-slate-600/50 text-slate-300 hover:bg-slate-600'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {['a', 'b', 'c', 'd'].map((option) => (
                                            <div
                                                key={option}
                                                className={`p-4 rounded-xl ${q.correctAnswer === option
                                                    ? 'bg-green-500/10 border border-green-500/30'
                                                    : 'bg-slate-700/30 border border-slate-600'
                                                    }`}
                                            >
                                                <span className={`font-arabicUI3 ${q.correctAnswer === option ? 'text-green-400' : 'text-slate-300'
                                                    }`}>
                                                    {q.options[option]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    {q.imageUrl && (
                                        <div className="mt-4">
                                            <img
                                                src={q.imageUrl}
                                                alt="Question Image"
                                                className="w-full max-w-md mx-auto h-auto rounded-xl border border-slate-600"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateQuestions;