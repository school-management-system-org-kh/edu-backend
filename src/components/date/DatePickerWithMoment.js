import { DatePicker } from 'antd';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';

const DatePickerWithMoment = DatePicker.generatePicker(momentGenerateConfig);

export default DatePickerWithMoment;