import React from "react";
import style from "./InputBox.module.css";

const InputBox = ({
    name,
    type,
    className,
    label,
    value,
    htmlFor,
    defaultValue,
    onChange,
    placeholder,
    accept,
    inputStyle,
    disabled,
    max
  }) => {
    return (
      <div className={`${style.input} ${className}`}>
        <label htmlFor={htmlFor}>{label}</label>
        <input
          placeholder={placeholder}
          type={type}
          style={inputStyle}
          accept={accept}
          disabled={disabled}
          max={max}
          value={value}
          name={name}
          onChange={onChange}
          defaultValue={defaultValue}
          min={0}
        />
      </div>
    );
  };
  
  export default InputBox;