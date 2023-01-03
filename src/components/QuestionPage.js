import React from 'react'
import './QuestionPage.css'
import { nanoid } from 'nanoid'

export default function QuestionPage(props) {
    
    const correctAnswer = props.correctAnswer
    const allAnswers = [...props.wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5)
    
    return (
        <div className='QuestionPage'>
            <div className='question-box'>
            <h2 className='question'>{props.question}</h2>
            {allAnswers.map(answ => {
                return <p className='answer' key={nanoid()} >{answ}</p>
            })}
            </div>
        </div>
    )
}