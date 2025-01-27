'use client'
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const QuizAutoProcessor = () => {
  const [inputText, setInputText] = useState("");
  const [parsedQuestions, setParsedQuestions] = useState([]);

  const handleProcess = () => {
    const lines = inputText.split("\n");
    const questions = [];
    let currentQuestion = null;

    lines.forEach((line) => {
      if (line.trim().match(/^\d+\./)) {
        // Detects a question line
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = { question: line.trim(), options: [] };
      } else if (line.trim().match(/^\(a\)|^\(b\)|^\(c\)|^\(d\)/)) {
        // Detects an option
        currentQuestion.options.push(line.trim());
      } else if (line.includes("==>")) {
        // Detects an answer
        const [, answerPart] = line.split("==>");
        if (currentQuestion) {
          currentQuestion.answer = answerPart.trim();
        }
      }
    });

    if (currentQuestion) {
      questions.push(currentQuestion); // Add the last question
    }

    setParsedQuestions(questions);
    if (inputText.length !== 0) {

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

  const handleCopyToClipboard = () => {





    if (parsedQuestions.length === 0) {

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
      return;


    }

    const formattedData = parsedQuestions
      .map(
        (item) =>
          `${item.question}${"==>"}\n${item.options.join("\n")}\n`
      )
      .join("\n");

    navigator.clipboard.writeText(formattedData)
      .then(() =>
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
        }
        ))
      .catch(() => alert("Failed to copy data."));
  };

  return (
    <div
      className="bg-yellow-500 p-4 m-4 rounded-xl font-arabicUI3  "

    >


      <h1 className=" text-4xl m-4">{`مضيف الاسهم ==>`}</h1>


      <div className=" flex ">
        <button className=' bg-white font-arabicUI3 text-black text-4xl p-2 w-fit rounded-xl m-3 active:bg-black/80 transition duration-300 drop-shadow-2xl active:ring-black/20 active:ring-4 ' onClick={handleProcess}>Convert</button>
        <button className=' bg-white font-arabicUI3 text-black text-4xl p-2 w-fit rounded-xl m-3 active:bg-black/80 transition duration-300 drop-shadow-2xl active:ring-black/20 active:ring-4 ' onClick={handleCopyToClipboard}>Copy</button>


      </div>

      <div className=" flex">
        <textarea
          rows="10"
          cols="80"
          placeholder="Paste your quiz text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className=" rounded-xl p-4 m-4"
        />
        <ToastContainer></ToastContainer>
        {parsedQuestions.length > 0 && (
          <div className="select-all">

            {parsedQuestions.map((item, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <p>
                  {item.question} {"==>"}
                </p>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {item.options.map((option, idx) => (
                    <li key={idx}>{option}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      </div>




    </div>
  );
};

export default QuizAutoProcessor;
