import React from 'react';
import { InputNumber } from 'antd';

const InputNumberComponent = ({ style, status, placeholder, value, setValue, min, max, textError, size, disabled, className, maxLength, isOnlyNumber }) => {
  // status= error, warning, normal
  // size= middle, small, large
  const onChange = (e) => {
    setValue && setValue(e)
  };
  return (
    <>
      <InputNumber
        className={`w-100 ${className}`}
        status={status ? status : "normal"}
        style={style ? style : ""}
        size={size ? size : 'large'}
        disabled={disabled ? disabled : false}
        value={value}
        placeholder={placeholder ? placeholder : ""}
        onKeyPress={(e) => {
          const charCode = e.which ? e.which : e.keyCode;
          const charStr = String.fromCharCode(charCode);
          const allowedChars = isOnlyNumber ? /[0-9]/ : min === 0 ? /[0-9.]/ : /[0-9.-]/;

          // Allow numbers, a single decimal point, and a minus sign at the start
          if (
            !allowedChars.test(charStr) // Only allow numbers, dot, and minus
            || (charStr === '.' && e.target.value.includes('.')) // Prevent multiple dots
            || (charStr === '-' && e.target.value.length > 0) // Allow minus only at the start
          ) {
            e.preventDefault();
          }
        }}
        maxLength={maxLength}
        onChange={onChange}
        min={min}
        max={max}
      />
      {textError ? <div class="ant-form-item-explain-error" style={{ color: "#ff4d4f" }}>{textError}</div> : ''}
    </>
  )
};
export default InputNumberComponent;