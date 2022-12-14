import React, { useEffect, useState } from 'react'
import './App.css';
import blob1 from './assets/blob-yellow.png'
import blob2 from './assets/blob-blue.png'
import IntroPage from './components/IntroPage'
import QuestionPage from './components/QuestionPage'

export default function App() {
  const [startQuizz, setStartQuizz] = useState(false)
  const [questions, setQuestion] = useState([])

  useEffect(() => {
     fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
     .then(res => res.json())
     .then(data => setQuestion(data.results))
     .catch(err => console.error(err))
  }, [])

 function start() {
    setStartQuizz(true)
  }

  const questionElements = questions.map(el => 
    <QuestionPage 
    question={el.question} 
    correctAnswer={el.correct_answer}
    incorrectAnswers={[el.incorrect_answers]}
    /> 
    )

  return (
    <div className="App">
      <img className='blob-yellow' src={blob1} alt='corner yellow background' />
      <img className='blob-blue' src={blob2} alt='corner blue background' />
      {startQuizz ? 
      questionElements
      : 
      <IntroPage start={start} />}
    </div>
  );
}

