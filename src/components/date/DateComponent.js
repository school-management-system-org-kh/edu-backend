import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const DateComponent = ({ isDateTime, size, style, status, format, type, value, setValue, placeholder, textError, width, isRangePicker = true, className, disabled, 
    minDate=null, maxDate=null
 }) => {
    // status= error, warning, normal
    const onChange = (date, dateString) => {
        setValue && setValue(dateString);
    };
    const { t } = useTranslation()

    return (
        <>
            <DatePicker
                style={style ? style :""}
                format={{
                    format: format ? format : 'MM-DD-YYYY',
                    type: type ? type : 'mask',
                }}
                className={`${className ? className : ""}`}
                size={size ? size : "large"}
                status={status ? status : "normal"}
                placeholder={placeholder ? placeholder : t('employee_date_plecholder')}
                disabled={disabled ? disabled : false}
                value={value ? dayjs(value) : null}
                onChange={onChange}
                minDate={minDate ? dayjs(minDate) : null}
                maxDate={maxDate ? dayjs(maxDate) : null}
            />
            {textError && (
                <div className="ant-form-item-explain-error" style={{ color: "#ff4d4f" }}>
                    {textError}
                </div>
            )}
        </>
    );
};

export default DateComponent;
