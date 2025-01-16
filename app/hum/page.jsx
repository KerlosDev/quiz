'use client';

import React, { useState } from 'react';

const QuizFormat = () => {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');

  // Function to parse the input text and format it
  const handleTextInput = () => {
    // Adjust regex to support the new format with multiple questions
    const regex = /(\d+\.\s*.*?)(\(\w\)) (.*?)\n(\(\w\)) (.*?)\n(\(\w\)) (.*?)\n==>(\w)/gs;
    let match;
    let formatted = '';
    
    // Match all questions in the input text
    while ((match = regex.exec(inputText)) !== null) {
      const question = match[1].trim();
      const answerA = match[2] + ' ' + match[3].trim();
      const answerB = match[4] + ' ' + match[5].trim();
      const answerC = match[6] + ' ' + match[7].trim();
      const correctAnswer = match[8];

      formatted += `${question} ==> ${correctAnswer}\n${answerA}\n${answerB}\n${answerC}\n\n`;
    }

    if (formatted) {
      setFormattedText(formatted.trim());
    } else {
      setFormattedText('Invalid input format.');
    }
  };

  return (
    <div className=' bg-red-400'>
      <h3>Input the full question and answers</h3>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="19. Nous faisons... yoga trois jours par semaine.\n(a) de la\n(b) du\n(c) le\n==>b\n\n20. Vous allez... à quelle heure ?\n(a) se lever\n(b) vous lever\n(c) vous lever\n==>c"
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
