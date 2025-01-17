'use client'
import React, { useState } from 'react';

const QuizFormat = () => {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [inputTextt, setInputTextt] = useState('');
  const [formattedTextt, setFormattedTextt] = useState('');

  // Function to parse the input text and format it
  const handleTextInput = () => {
    const regex = /(\d+\.\s*.*?)(\(\w\)) (.*?)\n(\(\w\)) (.*?)\n(\(\w\)) (.*?)\n(\(\w\)) (.*?)\n==>(\w)(\nimage==>https?:\/\/[^\s]+)?/gs;
    let match;
    let formatted = '';

    while ((match = regex.exec(inputText)) !== null) {
      const question = match[1].trim();
      const answerA = match[2] + ' ' + match[3].trim();
      const answerB = match[4] + ' ' + match[5].trim();
      const answerC = match[6] + ' ' + match[7].trim();
      const answerD = match[8] + ' ' + match[9].trim();
      const correctAnswer = match[10];
      const imageUrl = match[11] ? match[11].replace('image==>', '').trim() : '';

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

  const handleTextTInput = () => {
    const regex = /(\d+\.\s*.*?)(\(\w\)) (.*?)\n(\(\w\)) (.*?)\n(\(\w\)) (.*?)\n(\(\w\))? ?(.*?)?\n==>(\w)/gs;
    let match;
    let formatted = '';
  
    while ((match = regex.exec(inputTextt)) !== null) {
      const question = match[1].trim();
      const answerA = match[2] + ' ' + match[3].trim();
      const answerB = match[4] + ' ' + match[5].trim();
      const answerC = match[6] + ' ' + match[7].trim();
      const answerD = match[8] ? match[8] + ' ' + match[9]?.trim() : '(d) Empty Choice'; // Handle missing choice
      const correctAnswer = match[10];
  
      formatted += `${question} ==>${correctAnswer}\n${answerA}\n${answerB}\n${answerC}\n${answerD}\n\n`;
    }
  
    if (formatted) {
      setFormattedTextt(formatted.trim());
    } else {
      setFormattedTextt('Invalid input format.');
    }
  };
  

  // Function to copy the first formatted text to clipboard
  const handleCopyToClipboard = () => {
    if (formattedText) {
      navigator.clipboard.writeText(formattedText)
        .then(() => alert('Formatted text copied to clipboard!'))
        .catch((err) => alert('Failed to copy text: ', err));
    } else {
      alert('No formatted text to copy.');
    }
  };

  // Function to copy the second formatted text to clipboard
  const handleCopyToClipboardT = () => {
    if (formattedTextt) {
      navigator.clipboard.writeText(formattedTextt)
        .then(() => alert('Formatted text copied to clipboard!'))
        .catch((err) => alert('Failed to copy text: ', err));
    } else {
      alert('No formatted text to copy.');
    }
  };

  // Function to reset the first section
  const handleResetFirst = () => {
    setInputText('');
    setFormattedText('');
  };

  // Function to reset the second section
  const handleResetSecond = () => {
    setInputTextt('');
    setFormattedTextt('');
  };

  return (
    <div className='bg-orange-500 p-4'>
      <h3 className='text-white'>Input the full question and answers</h3>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={`26. Ma famille est sortie, il n'y a... à la maison.\n(a) rien\n(b) pas\n(c) plus\n(d) des murs verts\n==>d\nimage==>https://i.imgur.com/AhKtlEi.png`}
        rows={8}
        cols={50}
        className='w-full p-2 mb-4'
      />
      <button
        onClick={handleTextInput}
        className='bg-blue-500 text-white px-4 py-2 mr-2 rounded'
      >
        Format
      </button>
      <button
        onClick={handleCopyToClipboard}
        className='bg-green-500 text-white px-4 py-2 mr-2 rounded'
      >
        Copy Content
      </button>
      <button
        onClick={handleResetFirst}
        className='bg-red-500 text-white px-4 py-2 ml-2 rounded'
      >
        Reset
      </button>

      <div className='mt-4'>
        <h4 className='text-white'>Formatted Result:</h4>
        <pre className='bg-white p-4 rounded'>{formattedText}</pre>
      </div>

      <div className='bg-slate-800 p-4 mt-8 rounded'>
        <h3 className='text-white'>Input another question set</h3>
        <textarea
          value={inputTextt}
          onChange={(e) => setInputTextt(e.target.value)}
          placeholder="19. Nous faisons... yoga trois jours par semaine.\n(a) de la\n(b) du\n(c) le\n==>b\n\n20. Vous allez... à quelle heure ?\n(a) se lever\n(b) vous lever\n(c) vous lever\n==>c"
          rows={8}
          cols={50}
          className='w-full p-2 mb-4'
        />
        <button
          onClick={handleTextTInput}
          className='bg-blue-500 text-white px-4 py-2 mr-2 rounded'
        >
          Format
        </button>
        <button
          onClick={handleCopyToClipboardT}
          className='bg-green-500 text-white px-4 py-2 rounded'
        >
          Copy Content
        </button>
        <button
          onClick={handleResetSecond}
          className='bg-red-500 text-white px-4 py-2 ml-2 rounded'
        >
          Reset
        </button>

        <div className='mt-4'>
          <h4 className='text-white'>Formatted Result:</h4>
          <pre className='bg-white p-4 rounded'>{formattedTextt}</pre>
        </div>
      </div>
    </div>
  );
};

export default QuizFormat;
