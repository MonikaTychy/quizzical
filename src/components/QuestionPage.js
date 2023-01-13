import React from 'react'
import './QuestionPage.css'
import { nanoid } from 'nanoid'

export default function QuestionPage({questions, chooseAnswer, checkAnswers, endQuizz, result, restartGame}) {

    const questionElements = questions.map(question => {
        return (
            <div className='question-box' key={question.key}>
            <h2 className='question'>{question.question}</h2>
            {question.answers.map(answ => {
               return (
                <span 
                  className={`answer ${answ.selected ? "selected" : ""} `}
                  key={nanoid()}
                  onClick={() => chooseAnswer(answ.answerId, question.id)}>
                  {answ.answer}
                </span>
                     )
             })
            }
            </div>
      )
    })
    
    
    return (
        <div className='QuestionPage'>
            {questionElements}
            {endQuizz ?
              <div className='score'>
                <p className='score-data'>You scored {result}/5 correct answers</p>
                <button 
                 className='btn playagain'
                 onClick={restartGame}>
                 Play Again
                </button>
                </div>
              :
              <button 
               className='btn'
               onClick={checkAnswers}>
               Check answers
              </button> 
        } 
        </div>
    )
}