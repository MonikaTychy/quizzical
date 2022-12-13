import React from 'react'
import './App.css';
import blob1 from './assets/blob-yellow.png'
import blob2 from './assets/blob-blue.png'
import IntroPage from './components/IntroPage'

export default function App() {
  return (
    <div className="App">
      <img className='blob-yellow' src={blob1} alt='corner yellow background' />
      <img className='blob-blue' src={blob2} alt='corner blue background' />
      <IntroPage />
    </div>
  );
}

