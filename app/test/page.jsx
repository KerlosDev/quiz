'use client'
import { useState } from "react";

export default function Quiz() {
    const [questionsInput, setQuestionsInput] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [output, setOutput] = useState("");

    const parseQuestions = (input) => {
        const questionBlocks = input.split(/\n\n/);
        return questionBlocks.map((block) => {
            const lines = block.split("\n");
            const text = lines[0].replace(/\d+\. /, "");
            const options = lines.slice(1, 5).map(line => line.replace(/\(\w\) /, "").trim());
            const imageMatch = block.match(/image==>(.+)/);
            const image = imageMatch ? imageMatch[1].trim() : "";
            return { text, options, image };
        });
    };

    const handleInputChange = (e) => {
        setQuestionsInput(e.target.value);
    };

    const handleLoadQuestions = () => {
        try {
            const parsedQuestions = parseQuestions(questionsInput);
            setQuestions(parsedQuestions);
            setAnswers(Array(parsedQuestions.length).fill(null));
            setSubmitted(false);
            setOutput("");
        } catch (error) {
            alert("Invalid input format. Please enter valid structured text.");
        }
    };

    const handleSelect = (index, choiceIndex) => {
        const newAnswers = [...answers];
        const choiceMap = ['a', 'b', 'c', 'd'];
        newAnswers[index] = choiceMap[choiceIndex];
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        if (answers.includes(null)) {
            alert("Please answer all questions before submitting.");
            return;
        }
        setSubmitted(true);
        const formattedOutput = questions
            .map((q, index) => {
                const selectedAnswer = answers[index] || "?";
                return `${index + 1}. ${q.text}${selectedAnswer}\n(a) ${q.options[0]} \n(b) ${q.options[1]} \n(c) ${q.options[2]} \n(d) ${q.options[3]} \nimage==>${q.image}\n`;
            })
            .join("\n");
        setOutput(formattedOutput);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output).then(() => {
            alert("تم نسخ الإجابات إلى الحافظة");
        }, (err) => {
            alert("فشل في نسخ الإجابات");
        });
    };

    const handleReset = () => {
        setQuestionsInput("");
        setQuestions([]);
        setAnswers([]);
        setSubmitted(false);
        setOutput("");
    };

    return (
        <div className="p-6 m-20 font-arabicUI3 bg-gray-300 rounded-xl">
            <h1 className="text-4xl font-arabicUI3 mb-4">اختيار الاختيارات</h1>

            <div className=" grid grid-cols-6">

                <textarea
                    className="w-full col-span-3 p-5 border rounded-xl mb-4"
                    rows="10"
                    placeholder='Enter questions in structured format here'
                    value={questionsInput}
                    onChange={handleInputChange}
                ></textarea>
                <button
                    className=' col-span-1 bg-blue-500 font-arabicUI3 ml-5 mb-5 text-white text-4xl p-2  rounded-md  active:bg-black/80 transition duration-300 drop-shadow-2xl active:ring-black/20 active:ring-4 '
                    onClick={handleLoadQuestions}
                >معالجة</button>
                <button onClick={handleSubmit} className=' col-span-1  bg-blue-700 font-arabicUI3 ml-5 mb-5 text-white text-4xl p-2  rounded-md  active:bg-black/80 transition duration-300 drop-shadow-2xl active:ring-black/20 active:ring-4 '
                >

                    معالجة 2
                </button>
                <button onClick={handleCopy}
                    className=' col-span-1  bg-blue-900 font-arabicUI3 ml-5 mb-5 text-white text-4xl p-2  rounded-md  active:bg-black/80 transition duration-300 drop-shadow-2xl active:ring-black/20 active:ring-4 '
                >
                    نسخ
                </button>

             
            </div>

            <button onClick={handleReset} className="w-full mt-4 text-5xl bg-red-500 text-white p-4 rounded">
                    إعادة تعيين
                </button>

            <div className=" grid grid-cols-4">
                {questions.length > 0 ? (
                    questions.map((q, index) => (
                        <div key={index} className="m-2 flex border-black border-2 p-2 rounded-lg bg-gray-400 shadow">
                            <h4 className=" text-5xl m-2">{index+1}</h4>
                            <div className="flex gap-4 mt-2">
                                {q.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`px-4 py-2 border rounded ${answers[index] === ['a', 'b', 'c', 'd'][i] ? "bg-blue-500 text-white" : "bg-gray-200"
                                            }`}
                                        onClick={() => handleSelect(index, i)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {submitted && <p className="mt-2 font-semibold">الإجابة المختارة: {answers[index]}</p>}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">لا توجد أسئلة متاحة</p>
                )}
            </div>


            {submitted && (
                <div className="mt-6 p-4 bg-white border rounded">
                    <h2 className="text-lg    mb-2">الإجابات النهائية:</h2>
                    <pre className="whitespace-pre-wrap font-arabicUI3 text-sm">{output}</pre>

                </div>
            )}
        </div>
    );
}
