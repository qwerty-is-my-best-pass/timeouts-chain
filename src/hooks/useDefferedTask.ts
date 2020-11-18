import {createTimerChain, TimersChainMethods} from '../utils/timerChain'
import {useMemo, useEffect} from 'react'

/**
 * Motivation to create
 * Ready to use hook based wrapper for timer сhain, very simple
 * But it helps to avoid errors with multiple chain creations and missing chain cleaning on unmount
 */

export const useDefferedTask = (): TimersChainMethods => {
  const [timerChainPush, stopChain] = useMemo(createTimerChain, [])
  useEffect(() => stopChain, [])

  return [timerChainPush, stopChain]
}
