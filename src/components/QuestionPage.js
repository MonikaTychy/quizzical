import React from 'react'
import './QuestionPage.css'
import { nanoid } from 'nanoid'

export default function QuestionPage(props) {
    
    const answerElements = props.answers.map(answ => {
        return <span 
        className={`answer ${answ.selected ? "selected" : ""} `}
        key={nanoid()}
        onClick={() => props.chooseAnswer(answ.answerId, props.id)}
        >
                {answ.answer}
              </span>
    })

    
    return (
        <div className='QuestionPage'>
            <div className='question-box'>
            <h2 className='question'>{props.question}</h2>
            {answerElements}
            </div>
        </div>
    )
}