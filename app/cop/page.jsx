'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ImageFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const formatImages = () => {
    const imageLinks = input.split(',').map(link => link.trim().replace(/"/g, ''));
    const formatted = imageLinks
      .map(
        (link, index) =>
          `${index + 1}. الاختيار الصح ؟ ==>\n(a) أ \n(b) ب \n(c) ج \n(d) د \nimage==>${link}\n`
      )
      .join('\n');
    setOutput(formatted);

    if (input.length !== 0) {

      toast.success("تمت المعالجة", {
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

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output)
        .then(() => {
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
        })
        .catch(() => {
          setCopySuccess('Failed to copy!');
          setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
        });
    }
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    toast.success("تم المسح", {
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
  };

  return (
    <div
      className="bg-yellow-500 p-4 m-4 rounded-xl font-arabicUI3  "

    >

      <h1 className=" text-4xl m-4 ">{` اللي بيظبط الـمصفوفة [] `}</h1>

      <div className=" flex ">
        <button className=' bg-white font-arabicUI3 text-black text-4xl p-2 w-fit rounded-xl m-3 active:bg-black/80 transition duration-300 drop-shadow-2xl active:ring-black/20 active:ring-4 ' onClick={formatImages}>Convert</button>
        <button className=' bg-white font-arabicUI3 text-black text-4xl p-2 w-fit rounded-xl m-3 active:bg-black/80 transition duration-300 drop-shadow-2xl active:ring-black/20 active:ring-4 ' onClick={copyToClipboard}>Copy</button>

        <button className=' bg-red-500 font-arabicUI3 text-white border-white border-4 text-4xl p-2 w-fit rounded-xl m-3 active:bg-red-700 transition duration-300 drop-shadow-2xl active:ring-red-700/20 active:ring-4 ' onClick={handleReset}>Reset</button>

      </div>

      <div className=' grid grid-cols-2'>

        <textarea
          rows="10"
          cols="50"
          className='p-4 rounded-xl m-4 '
          placeholder="Enter image links separated by commas"
          value={input}
          onChange={e => setInput(e.target.value)}
        />


        <pre className='p-4 rounded-xl font-arabicUI3 m-4 '
        >{output}</pre>
      </div>





      <ToastContainer></ToastContainer>






    </div>
  );
};

export default ImageFormatter;
