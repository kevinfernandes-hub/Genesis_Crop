import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

/**
 * Entry Point
 * - Imports App component and global styles
 * - Renders to #root DOM element
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
