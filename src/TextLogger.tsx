import React from 'react';

interface TextLoggerProps {
  strings?: Array<string>,
  name?: string
}

function TextLogger(props:TextLoggerProps) {
  const {strings, name} = props

  return (
    <div className="logger__container">
      <br/>
      <span className="logger__header">{name || "Лог"}</span>
      <br/>
      <br/>
      <textarea  readOnly spellCheck='false' className="logger__text-field" value={strings?.join('\n')}/>
    </div>
  );
}

export default TextLogger;
