import React from 'react'
import './QuestionPage.css'
import { nanoid } from 'nanoid'
import {decode} from 'html-entities'

export default function QuestionPage(props) {
    return (
        <div className='question-box'>
            <h2 className='question'>{props.question}</h2>
            <p className='answer'>{props.correctAnswer}</p>
            {props.wrongAnswers.map(el => {
                return (
                    <p key={nanoid()} className='answer'>{decode(el)}</p>
                )
            })}
        </div>
    )
}