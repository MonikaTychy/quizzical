import React, { useEffect, useState } from 'react'
import './App.css';
import blob1 from './assets/blob-yellow.png'
import blob2 from './assets/blob-blue.png'
import IntroPage from './components/IntroPage'
import QuestionPage from './components/QuestionPage'
import {decode} from 'html-entities';
import { nanoid } from 'nanoid'

export default function App() {
  const [startQuizz, setStartQuizz] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
       async function getQuestions() {
          const res = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
          
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          const data = await res.json()
          setQuestions(data.results.map(el => {
            return {
              key: nanoid(),
              id: nanoid(),
              question: decode(el.question),
              correctAnswer: decode(el.correct_answer),
              wrongAnswers: el.incorrect_answers,
              allAnswers: 1,
              chosenAnswer: false
            }
          }))
       }

       getQuestions()
  }, [])

 function start() {
    setStartQuizz(true)
  }

 const questionElements = questions.map(el => 
    <QuestionPage 
    key={el.key}
    id={el.id}
    question={el.question} 
    correctAnswer={el.correctAnswer}
    wrongAnswers={el.wrongAnswers}
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

