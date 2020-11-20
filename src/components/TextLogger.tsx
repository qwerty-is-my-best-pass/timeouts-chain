import React from 'react'

/**
 * Мotivation to create
 * In some crazy project it can be usefull to create a lot of log textareas
 * Theoreticaly here can be more styles and logic (for example some really attractive animations)
 * Can work with or without title, with any kind of text
 */

interface ITextLogger {
  log?: string[]
  title?: string
}

export const TextLogger = (props: ITextLogger) => {
  const {log, title} = props

  return (
    <div className='logger__container'>
      {!!title && (
        <>
          <br />
          <span className='logger__title'>{title}</span>
          <br />
          <br />
        </>
      )}
      <textarea
        readOnly
        spellCheck='false'
        className='logger__text-field'
        value={log?.join('\n')}
      />
    </div>
  )
}

export default TextLogger
