/**
 * Здесь хорошо зашел бы класс, но текущий вариант для меня - более интуитивный, и т.к. это тестовое - позволил себе вольность
 */

export type timersChainPush = (callback: ()=>any, time: number)=> void
export type timersChainStop = ()=> void
export type timersChainMethods = [timersChainPush, timersChainStop]

export function createTimerChain(): timersChainMethods {
  let lastReject: () => void
  let lastInterval: number
  let timerChain = getEmptyChain()

  function getEmptyChain(): Promise<void>{
    return new Promise((resolve: () => void, reject: () => void) => {
      lastReject = reject
      lastInterval = window.setTimeout(() => {
        resolve()
      }, 0)
    })
  }

  function stopChain(): void {
    timerChain.catch(() => {})
    lastReject()
    clearTimeout(lastInterval)
    timerChain = getEmptyChain()
  }

  return [(callback, time) => {
    timerChain = timerChain.then(() => (
      new Promise(
        (resolve, reject) => {
          lastReject = reject
          lastInterval = window.setTimeout(() => {
            resolve()
            callback()
          }, time)
        }
      )
    ))
  }, stopChain]
}


/**
 * Usage example
 * const [timerChainPush, stopChain] = createTimerChain()
 * timerChainPush(()=>{console.log(1)},1000)
 * timerChainPush(()=>{console.log(2)},1000)
 * timerChainPush(()=>{console.log(3)},1000)
 * setTimeout(stopChain,2000) - will brake chain before third console.log
 */