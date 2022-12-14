import React from 'react'
import './IntroPage.css'

export default function IntroPage(props) {
    return (
        <div className='IntroPage'>
        <h1 className='title'>Quizzical</h1>
        <p className='description'>Start the journey with quizzical and test your knowledge!</p>
        <button 
        className='btn start'
        onClick={props.start}
        >Start quiz</button>
        </div>
    )
}