import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const TextAreaComponent = ({status, placeholder, value, setValue, min, max, type, textError, size, disabled, className, height, rows}) => {
  // status= error, warning, normal
  // size= middle, small, large
  const onChange = (e) => {
    setValue && setValue(e.target.value)
  };
  return (
    <>
    <TextArea 
      className={`w-100 ${className}`} 
      rows={rows ? rows : 5}
      status={status ? status : "normal"} 
      size={size ? size : 'large'}
      disabled={disabled ? disabled : false}
      type={type ? type :""}
      style={{height: height ? height : ""}}
      value={value} 
      onChange={onChange} 
      placeholder={placeholder ? placeholder : ""} 
      />
      {textError ? <div class="ant-form-item-explain-error" style={{color: "#ff4d4f"}}>{textError}</div> : ''}
    </>
  )
};
export default TextAreaComponent;