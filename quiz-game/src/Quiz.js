import React, { useState } from 'react';
import { questions } from './questions';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerClick = (option) => {
    setSelectedOption(option);
    const correct = option === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>Your Score</h2>
          <p>{score} out of {questions.length}</p>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>
          </div>
          
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedOption !== null}
                className={
                  selectedOption === option
                    ? isCorrect
                      ? "correct"
                      : "incorrect"
                    : ""
                }
              >
                {option}
              </button>
            ))}
          </div>
          
          {selectedOption && (
            <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
              {isCorrect ? "Correct! 🎉" : `Incorrect! The answer is: ${questions[currentQuestion].correctAnswer}`}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;