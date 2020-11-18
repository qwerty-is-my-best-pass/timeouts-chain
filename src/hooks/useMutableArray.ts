import {useState, useRef} from 'react'

/**
 * Motivation to create
 * Avoiding state errors with async operations between rerenders
 * Doesn't solve the problem of array elements mutations
 */

export const useMutableArray = (): [
  Array<any>,
  (element: any) => void,
  (array: Array<any>) => void
] => {
  const [array, setStateArray] = useState<string[]>([])
  const mutableArray = useRef<string[]>([]).current

  const pushElement = (element: any): void => {
    mutableArray.push(element)
    setStateArray([...mutableArray])
  }

  const setBothArrays = (array: Array<any>): void => {
    mutableArray.splice(0, mutableArray.length)
    mutableArray.concat(array)
    setStateArray(array)
  }

  return [array, pushElement, setBothArrays]
}
