import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
const UploadDrag = ({width, height}) => {
  const { t } = useTranslation();
  
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} ${t("file uploaded successfully.")}`);
      } else if (status === 'error') {
        message.error(`${info.file.name} ${t("file upload failed.")}`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props} style={{width: width ? width :"50%", height: height ? height :"", textAlign:'center', margin:'auto'}}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{t("Click or drag file to this area to upload")}</p>
      <p className="ant-upload-hint"></p>
    </Dragger>
  );
};
export default UploadDrag;