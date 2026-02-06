import React, { useRef } from "react";
import { Col, Row, Select } from "antd";

import MessageConfirmModal from "../../Modals/MessageConfirmModal";
import FileUploadImgCrop from "../../FileUploadImgCrop";
import EditorComponent from "../../EditorComponent";

const FeesReceiptTab = ({ selectModule, setSelectModule, loading, setLoading }) => {
    const messageModalRef = useRef('');

    return (
        <div>
            <Row
                gutter={[16, 16]}
                style={{
                    marginBottom: 25,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Col span={6}>
                    <Select
                        placeholder="Select Module"
                        size="middle"
                        defaultValue="system"
                        value={selectModule}
                        style={{ width: "100%" }}
                        onChange={(e) => {
                            setLoading(true); // Start loading
                            setSelectModule(e);

                            // Simulate data fetching or processing delay
                            setTimeout(() => {
                                setLoading(false); // Stop loading after delay
                            }, 3000); // Adjust duration as needed
                        }}
                        options={[
                            { value: "feesReceipt", label: "Fees Receipt" },
                            { value: "payslip", label: "Payslip" },
                            { value: "onlineAdmissionReceipt", label: "Online Admission Receipt" },
                            { value: "onlineexam", label: "Online Exam" },
                            { value: "generalPurpose", label: "General Purpose" },
                        ]}
                    />
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <span style={{ fontSize: "1rem", fontWeight: 500 }}>Header Image (2230px X 300px) <span style={{ color: "red" }}>*</span></span>
                    <FileUploadImgCrop />
                </Col>
            </Row>
            <Row gutter={24} style={{marginTop:10}}>
                <Col span={24}>
                    <span style={{ fontSize: "1rem", fontWeight: 500 }}>Footer Content</span>
                    <EditorComponent />
                </Col>
            </Row>
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    )
}

export default FeesReceiptTab;