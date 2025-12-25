import React from 'react';
import './Input.scss';

export default function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  required = false,
  ...props
}) {
  return (
    <div className="input">
      {label && <label className="input__label">{label}</label>}

      <input
        className="input__field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        {...props}
      />
    </div>
  );
}
