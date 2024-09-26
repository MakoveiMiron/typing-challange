import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Import the CSS file
import { randomText } from './text';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [typedWords, setTypedWords] = useState(0);
  const [wpm, setWpm] = useState(0);
  const textRef = useRef(randomText[Math.floor(Math.random() * randomText.length)]);

  useEffect(() => {
    if (isFinished) {
      const timeTaken = (Date.now() - startTime) / 1000 / 60; // time in minutes
      const wordCount = inputValue.split(' ').filter(word => word !== '').length;
      setTypedWords(wordCount);
      setWpm(Math.round(wordCount / timeTaken));
    }
  }, [isFinished]);

  const handleChange = (e) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    const input = e.target.value;
    setInputValue(input);

    // Check if typing is finished
    if (input === textRef.current) {
      setIsFinished(true);
    }
  };

  const resetTest = () => {
    setInputValue('');
    setStartTime(null);
    setIsFinished(false);
    setTypedWords(0);
    setWpm(0);
    textRef.current = randomText[Math.floor(Math.random() * randomText.length)];
  };

  const renderColoredText = () => {
    const typedText = inputValue.split('');
    const originalText = textRef.current.split('');

    return originalText.map((char, index) => {
      let className;
      if (index < typedText.length) {
        className = typedText[index] === char ? 'green' : 'red'; // Correct or incorrect
      }
      return (
        <span key={index} className={className || 'black'}>
          {char}
        </span>
      );
    });
  };

  return (
    <>
      <div className="container">
        <h1>Typing Speed Test</h1>
        <p className="text">
          {renderColoredText()}
        </p>
        <textarea
          value={inputValue}
          onChange={handleChange}
          disabled={isFinished}
          placeholder="Start typing here..."
          className="textarea"
        />
        {isFinished && (
          <div className="results">
            <h2>Results</h2>
            <p>Words Typed: {typedWords}</p>
            <p>WPM: {wpm}</p>
            <button onClick={resetTest}>Restart Test</button>
          </div>
        )}
      </div>

      {/* Mobile message */}
      <div className="mobile-message">
        This app is only usable on PC
      </div>
    </>
  );
}

export default App;
