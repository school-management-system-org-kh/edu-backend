import { Button, Col, Divider, Form, Input, Radio, Row } from "antd";
import { useState } from "react";

const MiscellaneousTab = () => {
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

    return (
        <div>
            <Form form={form}>
                <Divider orientation="left" orientationMargin="0" style={{ fontSize: "1.2rem" }}>Online Examination</Divider>
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
                                Show Me Only My Question
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="showMe"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="showMe"
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

                <Divider orientation="left" orientationMargin="0" style={{ fontSize: "1.2rem" }}>ID Card Scan Code</Divider>
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
                                Scan Type
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="scanType"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="scanType"
                                        value={status}
                                        defaultValue="barcode"
                                        onChange={(e) => setStatus(e.target.value)}
                                        options={[
                                            { value: "barcode", label: 'Barcode' },
                                            { value: "QRCode", label: 'QR Code' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Divider orientation="left" orientationMargin="0" style={{ fontSize: "1.2rem" }}>Examinations</Divider>
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
                                Exam Result Page In Front Site
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="examResult"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="examResult"
                                        value={status}
                                        defaultValue="disabled"
                                        onChange={(e) => setStatus(e.target.value)}
                                        options={[
                                            { value: "disabled", label: 'Disabled' },
                                            { value: "Enabled", label: 'enabled' },
                                        ]}
                                    />
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
                                Download Admit Card In Student / Parent Panel
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="downloadAdmin"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="downloadAdmin"
                                        value={status}
                                        defaultValue="disabled"
                                        onChange={(e) => setStatus(e.target.value)}
                                        options={[
                                            { value: "disabled", label: 'Disabled' },
                                            { value: "Enabled", label: 'enabled' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Divider />
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
                                Teacher Restricted Mode
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="teacher"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="teacher"
                                        value={status}
                                        defaultValue="disabled"
                                        onChange={(e) => setStatus(e.target.value)}
                                        options={[
                                            { value: "disabled", label: 'Disabled' },
                                            { value: "Enabled", label: 'enabled' },
                                        ]}
                                    />
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
                                Superadmin Visibility
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="superadmin"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="superadmin"
                                        value={status}
                                        defaultValue="disabled"
                                        onChange={(e) => setStatus(e.target.value)}
                                        options={[
                                            { value: "disabled", label: 'Disabled' },
                                            { value: "Enabled", label: 'enabled' },
                                        ]}
                                    />
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
                                Event Reminder
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="event"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="event"
                                        value={status}
                                        defaultValue="disabled"
                                        onChange={(e) => setStatus(e.target.value)}
                                        options={[
                                            { value: "disabled", label: 'Disabled' },
                                            { value: "Enabled", label: 'enabled' },
                                        ]}
                                    />
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
                                Staff Apply Leave Notification Email
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="event"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input size="middle"/>
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

export default MiscellaneousTab;
