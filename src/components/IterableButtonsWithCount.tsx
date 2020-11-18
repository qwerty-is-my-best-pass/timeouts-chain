import React from 'react'

/**
 * Motivation to create
 * In some crazy project it can be usefull to create a lot of buttons with counter everywhere
 * Buttons can have different names and i can create different count of them
 */

interface IIterableButtonsWithCount {
  buttonsOnClick: (index: number) => void
  buttonsCount: number
  basicButtonName: string
}

export const IterableButtonsWithCount = (props: IIterableButtonsWithCount) => {
  const {basicButtonName, buttonsOnClick, buttonsCount} = props

  return (
    <>
      {Array.from(Array(buttonsCount).keys()).map((index: number) => {
        index++
        return (
          <button key={`button${index}`} onClick={() => buttonsOnClick(index)}>
            {`${basicButtonName} ${index}`}
          </button>
        )
      })}
    </>
  )
}

export default IterableButtonsWithCount
