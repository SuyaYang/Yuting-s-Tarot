import React, { useState } from 'react'
import './App.css'
import About from './About'
import ShufflePage from './pages/ShufflePage'

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'about' | 'shuffle'>('home')

  const startDrawing = () => setPage('shuffle')

  if (page === 'about') return <About onBack={() => setPage('home')} />
  if (page === 'shuffle') return <ShufflePage onBack={() => setPage('home')} />

  return (
    <div className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">Positive Tarot</h1>
        <p className="hero-sub">Welcome to Positive Tarot, a space where every card shines with guidance, growth, and gentle wisdom.</p>

        <div className="hero-controls" role="group" aria-label="hero actions">
          <button className="btn primary" onClick={startDrawing}>Begin Drawing</button>
          <button className="btn" onClick={() => setPage('about')}>About</button>
        </div>
      </div>
    </div>
  )
}

export default App
