import { Button, Col, DatePicker, Divider, Form, Input, Radio, Row } from "antd";
import { useState } from "react";

const WhatsappSettingsTab = () => {
    const [status, setStatus] = useState("disable")
    const { RangePicker } = DatePicker;
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
                <Divider orientation="left" orientationMargin="0" style={{ fontSize: "1.2rem" }}>Front Site</Divider>
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
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Whatsapp Link
                            </Col>
                            <Col span={8}>
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
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Mobile No.
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="event"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input defaultValue="9800000001" size="middle"/>
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
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Time
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="time"
                                    style={{ marginBottom: 0 }}
                                >
                                    <RangePicker style={{width:"100%"}} picker="time" onChange={(value) => console.log(value)} size="middle" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Divider style={{ fontSize: "1.2rem" }} />

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
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Whatsapp Link
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="showStatus"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="showStatus"
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
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Mobile No.
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="mobileNo"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input defaultValue="9800000001" size="middle"/>
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
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Time
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="time1"
                                    style={{ marginBottom: 0 }}
                                >
                                    <RangePicker style={{width:"100%"}} picker="time" onChange={(value) => console.log(value)} size="middle" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Divider orientation="left" orientationMargin="0" style={{ fontSize: "1.2rem" }}>Student / Guardian Panel</Divider>
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
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Whatsapp Link
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="student"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="student"
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
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Mobile No.
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="panel"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input defaultValue="9800000001" size="middle"/>
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
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Time
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="time2"
                                    style={{ marginBottom: 0 }}
                                >
                                    <RangePicker style={{width:"100%"}} picker="time" onChange={(value) => console.log(value)} size="middle" />
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

export default WhatsappSettingsTab;
