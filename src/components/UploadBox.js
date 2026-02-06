import React from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { message, Upload } from 'antd';
const { Dragger } = Upload;

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
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
const UploadBox = () => (
    <Dragger {...props}>
        <p className="ant-upload-drag-icon" style={{margin:"0px"}}>
            <FaCloudUploadAlt size={36}/>
        </p>
        <p className="ant-upload-text">Drag and drop a file here or click</p>
    </Dragger>
);
export default UploadBox;