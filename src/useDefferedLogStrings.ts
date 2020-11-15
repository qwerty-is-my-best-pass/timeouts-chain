import {useState, useRef, useMemo} from 'react'
import { createTimerChain } from './utils';

/**
 * Здесь странность в том что первый аргумент deferredStringPush - функция, а интуитивно ждешь строку
 * Но т.к. это решение сложнее чем со строкой и при этом у меня нет ни контекста, ни каких-то принятых норм
 * Ниже я просто оберну в немного странный декоратор
 * 
 * Всё в кучу собрано - потому что кейс специфичный, не особо расширяемый, писать решение под целый класс задач или дробить не вижу смысла
 * Если бы был контекст - возможно сделал бы иначе
 */

type deferredStringPush = (stringGenerator: () => string, time: number) => void
type deferredStringPushWOCallback = (string: string, time: number) => void

type useDefferedLogStringsInterface = [Array<string>, deferredStringPush, ()=>void]

export default function useDefferedLogStrings():useDefferedLogStringsInterface{
  const [loggerStrings, setLoggerStrings] = useState<string[]>([])
  const [timerChainPush, stopChain] = useMemo(createTimerChain,[])
  const mutableLoggerStrings = useRef<string[]>([]).current

  function addString(string: string):void {
    mutableLoggerStrings.push(string)
    setLoggerStrings([...mutableLoggerStrings])
  }

  function deferredStringPush(stringGenerator: () => string, time: number): void{
    function callback(): void{
      addString(stringGenerator())
    }
    timerChainPush(callback, time)
  }

  function reset(): void{
    stopChain()
    setLoggerStrings([])
    mutableLoggerStrings.splice(0, mutableLoggerStrings.length)
  }
  return [loggerStrings, deferredStringPush, reset]
}


//вот он, мой декоратор
export function useDefferedLogStringsWOCallback():[Array<string>, deferredStringPushWOCallback, ()=>void]{
  const [loggerStrings, deferredStringPush, reset] = useDefferedLogStrings()

  function deferredStringPushWOCallback (string: string, time: number): void {
    const stringGenerator = () => (string)
    deferredStringPush(stringGenerator, time)
  }

  return [loggerStrings, deferredStringPushWOCallback, reset]
}
