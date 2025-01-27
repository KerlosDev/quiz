'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function convertFormat(input) {
    const arabicToEnglish = {
        'أ': 'a',
        'ب': 'b',
        'ج': 'c',
        'د': 'd'
    };
    return input.replace(/(\([أبجد]\))/g, (match) => {
        const arabicLetter = match[1];
        return `(${arabicToEnglish[arabicLetter]})`;
    });
}

const page = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');

    const handleConvert = () => {
        if (inputText.length > 0) {
            toast.success(" تمت المعالجة", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                className: 'font-arabicUI3 w-fit m-7text-lg p-4 rounded-lg shadow-lg',
            })
        } else {
            toast.error(" مفيش بيانات يسطا", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                className: 'font-arabicUI3 w-fit m-7text-lg p-4 rounded-lg shadow-lg',
            })
        }
        setOutputText(convertFormat(inputText));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(outputText);
        if (outputText.length > 0) {
            toast.success("تم النسخ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                className: 'font-arabicUI3 w-fit m-7text-lg p-4 rounded-lg shadow-lg',
            })
        } else {
            toast.error(" مفيش بيانات يسطا", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                className: 'font-arabicUI3 w-fit m-7text-lg p-4 rounded-lg shadow-lg',
            })
        }

    };

    return (
        <div className=' bg-yellow-500 m-4 grid grid-cols-1  rounded-xl p-4'>

            <h1 className=' font-arabicUI3 m-4 text-5xl'>منسق الحروف :</h1>
            <div>
                <button className=' bg-black font-arabicUI3 text-yellow-500 text-4xl p-2 w-fit rounded-xl m-3 active:bg-black/80 transition duration-300 drop-shadow-2xl active:ring-black/20 active:ring-4 ' onClick={handleConvert}>Convert</button>
                <button className=' bg-blue-950 font-arabicUI3 text-yellow-500 text-4xl p-2 w-fit rounded-xl m-3 active:bg-black/80 transition duration-300 drop-shadow-2xl active:ring-black/20 active:ring-4 ' onClick={handleCopy}>Copy</button>

            </div>
            <div className=' flex'>

                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text here"
                    className=' rounded-xl  p-3 font-arabicUI3 m-3'
                    rows="10"
                    cols="50"
                />

                <pre className=' m-4 p-4 font-arabicUI3'>{outputText}</pre>
                <ToastContainer></ToastContainer>

            </div>


        </div>
    );
};

export default page;

// ...existing code...
