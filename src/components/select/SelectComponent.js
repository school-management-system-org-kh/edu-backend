import React from 'react';
import { Input, Select, Space } from 'antd';
import moment from "moment";

const SelectComponent = ({status, placeholder, value, setValue, textError, className, options, size, disabled, width, allowClear=true}) => {
  // status= error, warning, normal
const dateFormat = "MM/DD/YYYY";

  const onChange = (e, values) => {
    setValue && setValue(e, values)
  };
  
  return (
    <>
      <Select
        style={{
          width: width ? width : "100%",
        }}
        size={size ? size : 'large'}
        disabled={disabled ? disabled : false}
        showSearch={true}
        allowClear={allowClear}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) ||
          (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
        }
        status={status ? status : "normal"}
        className={`${width ? width : "w-100"} ${className}`}
        placeholder={placeholder ? placeholder : ""}
        value={value ? value : null}
        onChange={onChange}
        options={options}
        optionRender={(option) => (
          <span className='w-100'>
            <span className='d-flex w-100 align-items-center'>
              {option.data.emoji && (
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
              )}
              <span role="label" aria-label={option.data.label} className="mx-2">
                {option.data.label}
              </span>
              {option.data.date && (
                <span
                  role="date"
                  aria-label={option.data.label}
                  style={{ marginLeft: "auto" }} // Align date to the right
                >
                  {
                    moment(option.data.date).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format(dateFormat)
                  }
                </span>
              )}
            </span>
          </span>
        )}
      />
      {textError ? <div class="ant-form-item-explain-error" style={{color: "#ff4d4f"}}>{textError}</div> : ''}
    </>
  )
};
export default SelectComponent;