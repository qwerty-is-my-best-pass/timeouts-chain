import React from 'react';
import './LoggerApp.css';
import ButtonsBlock from './ButtonsBlock';
import TextLogger from './TextLogger';
import useDefferedLogStrings from './useDefferedLogStrings'


function LoggerApp() {
  const [loggerStrings, deferredStringPush, resetLog] = useDefferedLogStrings()

  function makeStringGenerator(index: number): () => string {
    let currentTime = new Date(Date.now()).toLocaleTimeString()
    return () => {
      return `${new Date(Date.now()).toLocaleTimeString()} : Нажата кнопка ${index} / ${currentTime}`
    }
  }

  function pushToLog(index: number): void {
    deferredStringPush(makeStringGenerator(index), index * 1000)
  }

  return (
    <div className="app__container">
      <ButtonsBlock
        iterableButtonsOnClick={pushToLog}
        iterableButtonsCount={3}
        cancelButtonOnClick={resetLog}
      />
      <TextLogger name='Лог' strings={loggerStrings} />
    </div>
  );
}

export default LoggerApp;
