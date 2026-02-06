import React, { useRef } from "react";
import MessageConfirmModal from "../Modals/MessageConfirmModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, Row } from "antd";
import SvgContentArrow from "../../assets/ContentArrow";
import UploadBox from "../UploadBox";
import EditorComponent from "../EditorComponent";

const AddNoticeBoard = () => {
    const messageModalRef = useRef('');
    const [form] = Form.useForm();
    const { t } = useTranslation()
    const navigate = useNavigate();
    const messageToData = [
        {
            name: "Student"
        },
        {
            name: "Parent"
        },
        {
            name: "Admin"
        },
        {
            name: "Teacher"
        },
        {
            name: "Accountant"
        },
        {
            name: "Librarian"
        },
        {
            name: "Receptionist"
        },
        {
            name: "Super Admin"
        }
    ]

    const SendByToData = [
        {
            name: "Email"
        },
        {
            name: "SMS"
        }
    ]
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                console.log("Saving user:", values);
                form.resetFields();
            })
            .catch((info) => {
                console.log("Validation Failed:", info);
            });
    };

    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card
                    title={
                        <div
                            className=""
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <span className=""
                                onClick={() => {
                                    navigate("/communicate/notice-board")
                                }}
                                style={{ cursor: "pointer", marginTop: "0.3rem" }}
                            >
                                <SvgContentArrow width="22px" />
                            </span>
                            <span style={{ fontWeight: 600, fontSize: "1.25rem", marginLeft: "0.5rem" }}>{t("Compose New Message")}</span>
                        </div>
                    }
                    style={{ height: 'auto' }}>
                    <Row gutter={24}>
                        <Col span={18}>
                            <Form
                                form={form}
                                layout="vertical"
                                style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
                            >

                                <Form.Item
                                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Title")}<span style={{ color: "red" }}> *</span></span>}
                                    name="field_name"
                                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please input a title")) }]}
                                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                                >
                                    <Input />
                                </Form.Item>

                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item
                                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Notice Date")}<span style={{ color: "red" }}> *</span></span>}
                                            name="field_section"
                                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a notice date")) }]}
                                            style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                                        >
                                            <DatePicker placeholder="Select notice date" style={{width:"100%"}} onChange={onChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Publish On")}<span style={{ color: "red" }}> *</span></span>}
                                            name="field_section1"
                                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a publish on")) }]}
                                            style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                                        >
                                            <DatePicker placeholder="Select publish on" style={{width:"100%"}} onChange={onChange} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Attachment")}</span>}
                                    name="field_group"
                                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                                >
                                    <UploadBox />
                                </Form.Item>

                                <Form.Item
                                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Message")}<span style={{ color: "red" }}> *</span></span>}
                                    name="field_subject"
                                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please input a message")) }]}
                                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                                >
                                    <EditorComponent />
                                </Form.Item>
                            </Form>
                        </Col>

                        <Col span={6}>
                            <h3 style={{ fontWeight: 600 }}>{t("Message To")}</h3>
                            {
                                messageToData?.map((mes) => (
                                    <div className="">
                                        <Checkbox
                                            // checked={mes.checked}
                                            style={{ marginLeft: "0.5rem" }}
                                        // onChange={(e) => onChange(e, record.id, item.id)}
                                        >
                                            {mes.name}
                                        </Checkbox>
                                    </div>
                                ))
                            }
                            <h3 style={{ fontWeight: 600, marginTop: "1.5rem" }}>{t("Send By")}</h3>
                            {
                                SendByToData?.map((sms) => (
                                    <div className="">
                                        <Checkbox
                                            // checked={mes.checked}
                                            style={{ marginLeft: "0.5rem" }}
                                        // onChange={(e) => onChange(e, record.id, item.id)}
                                        >
                                            {sms.name}
                                        </Checkbox>
                                    </div>
                                ))
                            }
                        </Col>
                    </Row>
                    {/* Centered Save button */}
                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                        <Button type="primary" onClick={handleSave()} style={{ width: "10%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                            {t("Send")}
                        </Button>
                    </div>
                </Card>
            </Col>

            <MessageConfirmModal textCentered ref={messageModalRef} />
        </Row>
    )
}

export default AddNoticeBoard;