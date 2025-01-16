'use client'
import React, { useState } from 'react';

const QuizFormat = () => {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');

  // Function to parse the input text and format it
  const handleTextInput = () => {
    // Adjust regex to handle questions with more than 3 answers and include an image URL after the question
    const regex = /(\d+\.\s*.*?)(\(\w\)) (.*?)\n(\(\w\)) (.*?)\n(\(\w\)) (.*?)\n(\(\w\)) (.*?)\n==>(\w)(\nimage==>https?:\/\/[^\s]+)?/gs;
    let match;
    let formatted = '';

    // Match all questions in the input text
    while ((match = regex.exec(inputText)) !== null) {
      const question = match[1].trim();
      const answerA = match[2] + ' ' + match[3].trim();
      const answerB = match[4] + ' ' + match[5].trim();
      const answerC = match[6] + ' ' + match[7].trim();
      const answerD = match[8] + ' ' + match[9].trim();
      const correctAnswer = match[10];
      const imageUrl = match[11] ? match[11].replace('image==>', '').trim() : '';

      // Add the formatted question with the correct answer in the same line
      formatted += `${question} ==>${correctAnswer}\n${answerA}\n${answerB}\n${answerC}\n${answerD}`;
      if (imageUrl) {
        formatted += `\nimage==>${imageUrl}`;
      }
      formatted += '\n\n';
    }

    if (formatted) {
      setFormattedText(formatted.trim());
    } else {
      setFormattedText('Invalid input format.');
    }
  };

  return (
    <div className=' bg-orange-500'>
      <h3>Input the full question and answers</h3>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={`2 .png`}
        rows={8}
        cols={50}
      />
      <button onClick={handleTextInput}>Format</button>

      <div>
        <h4>Formatted Result:</h4>
        <pre>{formattedText}</pre>
      </div>
    </div>
  );
};

export default QuizFormat;
