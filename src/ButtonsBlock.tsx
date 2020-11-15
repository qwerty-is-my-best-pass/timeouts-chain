import React from 'react';
import VeryMonotonousButtons from './VeryMonotonousButtons';

//тупой и не гибкий компонент который отражает именно конкретный кейс и не особенно подходит под переиспользование

interface ButtonsBlockProps {
  iterableButtonsOnClick: (...args: any[]) => any,
  iterableButtonsCount: number,
  cancelButtonOnClick: ()=>any
}

function ButtonsBlock(props:ButtonsBlockProps) {
  const {iterableButtonsOnClick, iterableButtonsCount, cancelButtonOnClick} = props

  return (
    <>
      <VeryMonotonousButtons 
        iterableButtonsCount = {iterableButtonsCount} 
        iterableButtonsOnClick = {iterableButtonsOnClick}
      />
      <button onClick={cancelButtonOnClick}>
        Сбросить
      </button>
    </>
  );
}

export default ButtonsBlock;
