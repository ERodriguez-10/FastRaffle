import React from 'react'

const Button = ({ text, bg, className }) => {
  return (
    <button className={`btn ${className}`} style={{background: bg}}>
      {text}
    </button>
  )
}

export default Button