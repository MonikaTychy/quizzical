import React from 'react'
import './QuestionPage.css'

export default function QuestionPage(props) {
    return (
        <div className='question-box'>
            <h2 className='question'>{props.question}</h2>
            <p className='answer'>answer</p>
        </div>
    )
}