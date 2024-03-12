import React from 'react'

const Button = ({ text, bg, className, onClickFunction }) => {
  return (
    <>
      <button onClick={onClickFunction} className={`btn ${className}`} style={{background: bg}}>
        <span dangerouslySetInnerHTML={{ __html: text }} style={{background: bg}}/>
      </button>
    </>
  )
}

export default Button