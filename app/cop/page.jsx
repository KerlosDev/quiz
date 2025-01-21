'use client';
import React, { useState } from 'react';

const ImageFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const formatImages = () => {
    const imageLinks = input.split(',').map(link => link.trim().replace(/"/g, ''));
    const formatted = imageLinks
      .map(
        (link, index) =>
          `${index + 1}. الاختيار الصح ؟ ==>\n(a) أ \n(b) ب \n(c) ج \n(d) د \nimage ==>${link}\n`
      )
      .join('\n');
    setOutput(formatted);
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output)
        .then(() => {
          setCopySuccess('Copied to clipboard!');
          setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
        })
        .catch(() => {
          setCopySuccess('Failed to copy!');
          setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
        });
    }
  };

  return (
    <div className='flex flex-col items-center font-arabicUI3 bg-yellow-400 min-h-screen p-6'>
      <h1 className='bg-black text-yellow-400 p-3 rounded-xl'>Image Link Formatter</h1>
      
      <textarea
        rows="5"
        cols="50"
        className='p-4 rounded-xl m-4 w-3/4'
        placeholder="Enter image links separated by commas"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      
      <div className="flex gap-4">
        <button
          onClick={formatImages}
          className='bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600'
        >
          Format Links
        </button>
        <button
          onClick={copyToClipboard}
          className='bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600'
          disabled={!output} // Disable if there's no output
        >
          Copy to Clipboard
        </button>
      </div>
      
      {copySuccess && (
        <p className='text-green-600 mt-2'>{copySuccess}</p>
      )}
      
      <h3 className='bg-black text-yellow-400 p-3 rounded-xl mt-4'>Formatted Output:</h3>
      <textarea
        rows="10"
        cols="50"
        readOnly
        className='p-4 rounded-xl m-4 w-3/4 bg-gray-100'
        value={output}
      />
    </div>
  );
};

export default ImageFormatter;
