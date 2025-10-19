import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { MainRouter } from './router'
import { initializeCountries } from '../constants'
import { GameProvider } from '../context/GameContext'
import '../App.scss'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

initializeCountries('en')

createRoot(rootElement).render(
  <StrictMode>
    <Router basename="/geosavant">
      <GameProvider>
        <MainRouter />
      </GameProvider>
    </Router>
  </StrictMode>
)
