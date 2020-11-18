import {useDefferedTask} from './useDefferedTask'
import {useMutableArray} from './useMutableArray'

type IDefferedLog = [
  string[],
  (stringGenerator: () => string, time: number) => void,
  () => void
]

/**
 * Motivation to create - use case
 */

export const useDefferedLog = (): IDefferedLog => {
  const [log, addString, setLog] = useMutableArray()
  const [timerChainPush, stopChain] = useDefferedTask()

  const deferredLogPush = (
    stringGenerator: () => string,
    time: number
  ): void => {
    const callback = (): void => {
      addString(stringGenerator())
    }
    timerChainPush(callback, time)
  }

  const reset = (): void => {
    stopChain()
    setLog([])
  }

  return [log, deferredLogPush, reset]
}

export default useDefferedLog
