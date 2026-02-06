import React, { useState } from "react";
import { Upload, Button } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const FeesReceiptTab = () => {
    const [fileUrl, setFileUrl] = useState(null);

    const handleBeforeUpload = (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            alert("You can only upload image files!");
            return Upload.LIST_IGNORE;
        }
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        return false; // prevent auto upload
    };

    const handleRemove = () => {
        setFileUrl(null);
    };

    return (
        <div className="mb-4">
            {!fileUrl ? (
                <Dragger
                    multiple={false}
                    showUploadList={false}
                    beforeUpload={handleBeforeUpload}
                    style={{
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: "#fafafa",
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined style={{ color: "#999" }} />
                    </p>
                    <p className="ant-upload-text">
                        Drag and drop a file here or{" "}
                        <span style={{ color: "#1677ff" }}>click</span>
                    </p>
                </Dragger>
            ) : (
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        border: "1px dashed #d9d9d9",
                        borderRadius: "8px",
                        overflow: "hidden",
                        height: "150px", // match your required size
                    }}
                >
                    <img
                        src={fileUrl}
                        alt="header"
                        style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "150px",
                            background: "rgba(0,0,0,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "end",
                            opacity: 0,
                            transition: "opacity 0.3s",
                        }}
                        className="hover-overlay"
                    >
                        <Button
                            color="cyan" variant="solid"
                            icon={<DeleteOutlined />}
                            onClick={handleRemove}
                            style={{ marginTop: "-7.5rem", backgroundColor: "none", fontWeight: 500 }}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            )}

            <style>
                {`
          .hover-overlay:hover {
            opacity: 1 !important;
          }
        `}
            </style>
        </div>
    );
};

export default FeesReceiptTab;
