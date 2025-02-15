import React from "react";
import styles from "./TextInput.module.css";
const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  required,
  readOnly,
  className
}) => {
  return (
    <div className={`${styles.textInput}`}>
      {label && <label className={styles.label}>{label}</label>}
      {type === "textarea" ? (
        <textarea
          required={required}
          readOnly={readOnly}
          className={`${styles.input} ${className}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          rows={4} 
        />
      ) : (
        <input
          required={required}
          readOnly={readOnly}
          type={type}
          className={`${styles.input} ${className}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
        />
      )}
    </div>
  );
};


export default TextInput;
