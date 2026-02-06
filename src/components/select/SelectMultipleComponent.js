import React from 'react';
import { Select, Tag } from 'antd';

const SelectMultipleComponent = ({ status, placeholder, value, setValue, textError, className, options, size, color, variant, mode }) => {

  const onChange = (e) => {
    setValue && setValue(e)
  };

  return (
    <>
      <Select
        style={{ width: "100%" }}
        mode= {mode ? mode : "multiple"}
        size={size || "middle"}
        showSearch
        allowClear
        status={status || "normal"}
        className={`w-100 ${className}`}
        placeholder={placeholder || ""}
        value={value} // must match option.value type exactly
        onChange={onChange}
        options={options} // array of { value, label }
        optionLabelProp="label" // ensures selected value shows label
        tagRender={({ label, value, closable, onClose }) => (
          <Tag color={color ? color : ""} variant={variant ? variant :""} closable={closable} onClose={onClose}>
            {label} {/* show the name */}
          </Tag>
        )}
        filterOption={(input, option) =>
          (option.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
      {textError && <div className="ant-form-item-explain-error" style={{ color: "#ff4d4f" }}>{textError}</div>}
    </>
  )
};
export default SelectMultipleComponent;