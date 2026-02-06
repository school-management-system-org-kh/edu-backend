import React from 'react';
import { Input } from 'antd';

const InputComponent = ({status, placeholder, value, setValue, min, max, type, textError, size, disabled, className, style}) => {
  // status= error, warning, normal
  // size= middle, small, large
  const onChange = (e) => {
    setValue && setValue(e.target.value)
  };
  return (
    <>
    <Input 
      className={`w-100 ${className}`} 
      style={style ? style :""}
      status={status ? status : "normal"} 
      size={size ? size : 'large'}
      disabled={disabled ? disabled : false}
      type={type ? type :""}
      value={value} 
      onChange={onChange} 
      autoComplete="off"
      placeholder={placeholder ? placeholder : ""} 
      />
      {textError ? <div class="ant-form-item-explain-error" style={{color: "#ff4d4f"}}>{textError}</div> : ''}
    </>
  )
};
export default InputComponent;