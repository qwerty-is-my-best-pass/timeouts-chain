import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import LoggerApp from './containers/LoggerApp'

ReactDOM.render(
  <React.StrictMode>
    <LoggerApp buttonsCount={3} title="Лог" />
  </React.StrictMode>,
  document.getElementById('root')
)
