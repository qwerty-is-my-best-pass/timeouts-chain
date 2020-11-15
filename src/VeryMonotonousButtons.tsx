import React from 'react';

interface VeryMonotonousButtonsProps {
  iterableButtonsOnClick: (index?: number) => any,
  iterableButtonsCount: number,
  basicButtonName?: string
}

function VeryMonotonousButtons(props:VeryMonotonousButtonsProps) {
  const {basicButtonName, iterableButtonsOnClick, iterableButtonsCount} = props

  return (
    <>
      {
        Array.from(Array(iterableButtonsCount || 1).keys()).map(function (index: number) {
          return (
          <button
            key={`button${index + 1}`}
            onClick = {()=>iterableButtonsOnClick(index + 1)}
          >
            {basicButtonName || 'Кнопка'} {index + 1}
          </button>)
        })
      }
    </>
  );
}

export default VeryMonotonousButtons;