import React from 'react'
import ReactDOM from 'react-dom/client'
import { routes } from './router'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { AliveScope } from 'react-activation'
import './index.css'

function App() {
  return useRoutes(routes)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // 取消严格模式 否则导致开发环境组件重复渲染问题
  // <React.StrictMode>
  <AliveScope>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AliveScope>,
  // </React.StrictMode>,
)
