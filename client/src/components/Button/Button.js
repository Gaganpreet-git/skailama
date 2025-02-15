import React from 'react'
import styles from './Button.module.css'

const Button = ({ children, type = "button", onClick, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button