import React, { useEffect, useState } from 'react'
import './App.css';
import blob1 from './assets/blob-yellow.png'
import blob2 from './assets/blob-blue.png'
import IntroPage from './components/IntroPage'
import QuestionPage from './components/QuestionPage'
import { decode } from 'html-entities';
import { nanoid } from 'nanoid'

export default function App() {
  const [startQuizz, setStartQuizz] = useState(false)
  const [questions, setQuestions] = useState([])
  const [result, setResult] = useState(0)
  const [endQuizz, setEndQuizz] = useState(false)

  useEffect(() => {
       async function getQuestions() {
          const res = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
          
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          const data = await res.json()
          const dataArray = data.results.map(el => {
            const correctAnswer = {
                answer: decode(el.correct_answer), 
                selected: false, 
                isCorrect: true, 
                answerId: nanoid()
              }
            const wrongAnswers = el.incorrect_answers.map(answ => {
                return {
                  answer: decode(answ),
                  selected: false,
                  isCorrect: false,
                  answerId: nanoid()
                }
              })
              const allAnswers = [correctAnswer, ...wrongAnswers]
              const shuffledAnswers =  allAnswers.sort(() => Math.random() - 0.5)

              return  {
                key: nanoid(),
                id: nanoid(),
                question: decode(el.question),
                answers: shuffledAnswers
              }
          })
          setQuestions(dataArray)
       }
       
       if(startQuizz) {
        getQuestions()
       }
  }, [startQuizz])

 function start() {
    setStartQuizz(true)
  }

  function chooseAnswer(answerId, questionId) {
    setQuestions(prevQuestions => {
       return prevQuestions.map(prevQuest => {
        return prevQuest.id === questionId ?
         {...prevQuest, answers: prevQuest.answers.map(answer => {
            return answer.answerId === answerId ?
              {...answer, selected: !answer.selected}
              : {...answer, selected: false}
            })
          }
          : prevQuest
        })
       })
    }
  
  function checkAnswers() {
      setResult(questions.filter(question => {
        return question.answers.filter(ans => ans.selected && ans.isCorrect)[0]
     }).length)
      setEndQuizz(true)
  }

  function restartGame() {
    setStartQuizz(false)
    setEndQuizz(false)
    setResult(0)
    setQuestions([])
  }

  return (
    <div className="App">
      <img className='blob-yellow' src={blob1} alt='corner yellow background' />
      <img className='blob-blue' src={blob2} alt='corner blue background' />
      {startQuizz && questions.length > 0 ? 
      <QuestionPage 
      questions={questions}
      chooseAnswer={chooseAnswer}
      checkAnswers={checkAnswers}
      endQuizz={endQuizz}
      result={result}
      restartGame={restartGame}
      /> 
      : <IntroPage start={start} />}
    </div>
  );
}

