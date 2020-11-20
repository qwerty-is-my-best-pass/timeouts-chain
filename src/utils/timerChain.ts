/**
 * The class syntax will looks pretty good here, but the current version for me is more intuitive
 */

type TimersChainPush = (callback: () => void, time: number) => void
type TimersChainStop = () => void
export type TimersChainMethods = [TimersChainPush, TimersChainStop]

export const createTimerChain = (): TimersChainMethods => {
  const getEmptyChain = (): Promise<void> => {
    return new Promise((resolve: () => void, reject: () => void) => {
      lastReject = reject
      lastInterval = window.setTimeout(() => resolve(), 0)
    })
  }

  const breakChain = (): void => {
    timerChain.catch((): void => {})
    lastReject()
    clearTimeout(lastInterval)
    timerChain = getEmptyChain()
  }

  let lastReject: () => void
  let lastInterval: number
  let timerChain = getEmptyChain()

  return [
    (callback, time) => {
      timerChain = timerChain.then(
        () =>
          new Promise((resolve, reject) => {
            lastReject = reject
            lastInterval = window.setTimeout(() => {
              resolve()
              callback()
            }, time)
          })
      )
    },
    breakChain
  ]
}

/**
 * Usage example
 * const [timerChainPush, breakChain] = createTimerChain()
 * timerChainPush(()=>{console.log(1)},1000)
 * timerChainPush(()=>{console.log(2)},1000)
 * timerChainPush(()=>{console.log(3)},1000)
 * setTimeout(breakChain,2000) - will brake chain before third console.log
 */
