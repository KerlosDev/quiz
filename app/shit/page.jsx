'use client'
import React, { useState } from "react";

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
  };

  const handleCopyToClipboard = () => {
    if (parsedQuestions.length === 0) {
      alert("No data to copy. Please process the quiz first.");
      return;
    }

    const formattedData = parsedQuestions
      .map(
        (item) =>
          `${item.question}${"==>"}\n${item.options.join("\n")}\n`
      )
      .join("\n");

    navigator.clipboard.writeText(formattedData)
      .then(() => alert("Data copied to clipboard!"))
      .catch(() => alert("Failed to copy data."));
  };

  return (
    <div
      className="bg-yellow-400 "
      style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}
    >
      <h1>Quiz Auto Processor</h1>
      <textarea
        rows="10"
        cols="80"
        placeholder="Paste your quiz text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ width: "100%", marginBottom: "20px" }}
      />
      <button
        className="bg-white"
        onClick={handleProcess}
        style={{ padding: "10px 20px", fontSize: "16px", marginRight: "10px" }}
      >
        Process Quiz
      </button>
      <button
        className="bg-white"
        onClick={handleCopyToClipboard}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Copy to Clipboard
      </button>
      {parsedQuestions.length > 0 && (
        <div  className="select-all"> 
          
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
  );
};

export default QuizAutoProcessor;
