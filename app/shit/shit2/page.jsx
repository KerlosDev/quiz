'use client'
import React, { useState } from "react";

const QuizApp = () => {
  const [questionsInput, setQuestionsInput] = useState("");
  const [answersInput, setAnswersInput] = useState("");
  const [processedQuiz, setProcessedQuiz] = useState([]);

  const processQuiz = () => {
    const questionsArray = questionsInput
      .split("\n\n") // Split the questions input into blocks
      .map((block) => {
        const lines = block.split("\n"); // Split each block into lines
        const question = lines.slice(0, lines.length - 1).join("\n"); // Take all lines except the image line
        const imageLine = lines[lines.length - 1]; // Assume the last line contains the image URL
        return {
          content: question,
          image: imageLine.includes("image==>") ? imageLine : null,
        };
      });

    const answersArray = answersInput
      .split(" ") // Split answers into individual ones
      .filter((answer) => answer.trim() !== ""); // Filter out any empty values

    // Combine questions and answers
    const combinedQuiz = questionsArray.map((question, index) => ({
      ...question,
      answer: answersArray[index], // Assign the corresponding answer
    }));

    setProcessedQuiz(combinedQuiz);
  };

  const handleCopyToClipboard = () => {
    if (processedQuiz.length === 0) {
      alert("No data to copy. Please process the quiz first.");
      return;
    }

    // Format the processed quiz into a copyable string
    const formattedData = processedQuiz
      .map(
        (q) =>
          `${q.content}\n==>${q.answer}\n${q.image ? `${q.image}\n` : ""}`
      )
      .join("\n");

    // Copy the formatted data to the clipboard
    navigator.clipboard
      .writeText(formattedData)
      .then(() => alert("Quiz copied to clipboard!"))
      .catch(() => alert("Failed to copy quiz."));
  };

  return (
    <div className="bg-yellow-400" style={{ padding: "20px" }}>
      <h2>Quiz Processor</h2>

      <textarea
        rows="15"
        cols="100"
        placeholder="Paste questions here..."
        value={questionsInput}
        onChange={(e) => setQuestionsInput(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      ></textarea>
      <br />
      <textarea
        rows="5"
        cols="100"
        placeholder="Paste answers here..."
        value={answersInput}
        onChange={(e) => setAnswersInput(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      ></textarea>
      <br />
      <button
        onClick={processQuiz}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Process Quiz
      </button>
      <button
        onClick={handleCopyToClipboard}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Copy to Clipboard
      </button>

      <div className="select-auto" style={{ marginTop: "20px" }}>
        {processedQuiz.map((q, index) => (
          <div key={index}>
            <pre>
              {q.content}
              {`\n==>${q.answer}`}
              {q.image ? `\n${q.image}` : ""}
            </pre>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizApp;
