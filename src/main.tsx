import React from 'react'
import ReactDOM from 'react-dom/client'
import { routes } from './router'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import './index.css'

function App() {
  return useRoutes(routes)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
