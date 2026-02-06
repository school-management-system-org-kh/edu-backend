import React, { useEffect, useState } from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useTranslation } from 'react-i18next';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const DateRangeComponent = ({ isDateTime, status, format, type, disabled, value, setValue, placeholder, textError, size, style, className, picker }) => {
    // status= error, warning, normal
    // const [dates, setDates] = useState([dayjs('2019-09-03'), dayjs('2019-11-22')]);
    const { t } = useTranslation()
    
     const [dates, setDates] = useState([...value ? value.map(date => date ? dayjs(date) : null) : [null, null]]);
     useEffect(() => {
        value && setDates(value ? value.map(date => date ? dayjs(date) : null) : [null, null])
     }, [value])

    const onChangeRange = (date, dateString) => {
        setValue && setValue(dateString)
    };

    return (
        <>
            <RangePicker
                picker={picker ? picker : "date"}
                value={dates}
                style={style ? style :""}
                status={status ? status : "normal"}
                onChange={onChangeRange}
                disabled = {disabled ? disabled : false}
                placeholder={placeholder ? placeholder : t('')}
                size={size ? size : "large"}
                format={{
                    format: format ? format : 'MM-DD-YYYY',
                    type: 'mask',
                }}
                className={className ? className :""}
            />
            {textError ? <div class="ant-form-item-explain-error" style={{ color: "#ff4d4f" }}>{textError}</div> : ''}
        </>
    )
};
export default DateRangeComponent;