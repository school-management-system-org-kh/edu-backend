import { Button, Checkbox, Col, Form, Radio, Row } from "antd";
import { useState } from "react";

const GuardianPanelTab = () => {
    const [status, setStatus] = useState("disable")
    const [form] = Form.useForm();

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                console.log("Form Values:", values);
                // 👉 Call your API here with `values`
            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    const userLoginOption = [
        { label: 'Student Login', value: 'studentLogin' },
        { label: 'Parent Login', value: 'parentLogin', }
    ];

    const studentLoginOption = [
        { label: 'Admission No', value: 'admissionNo' },
        { label: 'Mobile Number', value: 'mobileNumber' },
        { label: 'Email', value: 'email' }
    ];

    const perentLoginOption = [
        { label: 'Mobile Number', value: 'mobileNumber' },
        { label: 'Email', value: 'email' }
    ];

    return (
        <div>
            <Form form={form}>
                <Row gutter={24}>
                    <Col span={24}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 20,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Col
                                span={10}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Maintenance Mode
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="user"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Checkbox.Group options={userLoginOption} defaultValue={['studentLogin', 'parentLogin']} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={24}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 20,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Col
                                span={10}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >

                                Additional Username Option For Student Login
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="student"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Checkbox.Group options={studentLoginOption} defaultValue={['admissionNo', 'mobileNumber', 'email']} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 20,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Col
                                span={10}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >

                                Additional Username Option For Parent Login
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="perent"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Checkbox.Group options={perentLoginOption} defaultValue={['mobileNumber', 'email']} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={24}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 20,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Col
                                span={10}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Allow Student To Add Timeline
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="timeline"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="timeline"
                                        value={status}
                                        defaultValue="disabled"
                                        onChange={(e) => setStatus(e.target.value)}
                                        options={[
                                            { value: "disabled", label: 'Disabled' },
                                            { value: "enabled", label: 'Enabled' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* Centered Save button */}
                <div style={{ textAlign: "center", marginTop: "24px" }}>
                    <Button
                        type="primary"
                        onClick={handleSave}
                        style={{ width: "20%", fontSize: "1rem", fontWeight: 600 }}
                        size="middle"
                    >
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default GuardianPanelTab;
