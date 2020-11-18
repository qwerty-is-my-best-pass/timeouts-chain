import React from 'react'
import '../styles/LoggerApp.css'
import TextLogger from '../components/TextLogger'
import useDefferedLogStrings from '../hooks/useDefferedLog'
import {SECOND} from '../constants/universalConstants'
import IterableButtonsWithCount from '../components/IterableButtonsWithCount'

interface ILoggerApp {
  buttonsCount: number
  title?: string
}

const LoggerApp = (props: ILoggerApp) => {
  const {buttonsCount, title} = props

  const [log, deferredLogPush, resetLog] = useDefferedLogStrings()

  const stringGenerator = (index: number): (() => string) => {
    const currentTime = new Date(Date.now()).toLocaleTimeString()
    return () =>
      `${new Date(
        Date.now()
      ).toLocaleTimeString()} : Нажата кнопка ${index} / ${currentTime}`
  }

  const pushToLog = (index: number): void => {
    deferredLogPush(stringGenerator(index), index * SECOND)
  }

  return (
    <div className='app__container'>
      <IterableButtonsWithCount
        buttonsCount={buttonsCount}
        buttonsOnClick={pushToLog}
        basicButtonName='Кнопка'
      />
      <button onClick={resetLog}>Сбросить</button>
      <TextLogger title={title} log={log} />
    </div>
  )
}

export default LoggerApp
