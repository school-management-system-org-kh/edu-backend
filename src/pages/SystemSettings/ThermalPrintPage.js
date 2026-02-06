import { Button, Card, Col, Input, Radio, Row, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const ThermalPrintPage = () => {
    const [editable, setEditable] = useState("disabled");
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
        <Row gutter={24}>
            <Col span={24}>
                <Card
                    title={
                        <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>
                            Thermal Print
                        </span>
                    }
                    style={{ height: "auto" }}
                >
                    <Form form={form} layout="vertical">
                        <Row gutter={24}>
                            <Col span={24}>
                                {/* Thermal Print Enabled/Disabled */}
                                <Row
                                    gutter={[24, 24]}
                                    style={{
                                        marginBottom: 25,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Col
                                        span={7}
                                        style={{ fontSize: "1rem", fontWeight: 500 }}
                                    >
                                        Thermal Print <span style={{ color: "red" }}>*</span>
                                    </Col>
                                    <Col span={15}>
                                        <Form.Item
                                            name="thermalPrint"
                                            initialValue={editable}
                                            rules={[{ required: true, message: "Please select an option" }]}
                                            style={{ marginBottom: 0 }}
                                        >
                                            <Radio.Group
                                                onChange={(e) => setEditable(e.target.value)}
                                                options={[
                                                    { value: "disabled", label: "Disabled" },
                                                    { value: "enabled", label: "Enabled" },
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* School Name */}
                                <Row
                                    gutter={[24, 24]}
                                    style={{
                                        marginBottom: 25,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Col
                                        span={7}
                                        style={{ fontSize: "1rem", fontWeight: 500 }}
                                    >
                                        School Name <span style={{ color: "red" }}>*</span>
                                    </Col>
                                    <Col span={15}>
                                        <Form.Item
                                            name="schoolName"
                                            rules={[{ required: true, message: "Please enter a school name" }]}
                                            initialValue="Mount/ Carmel /School"
                                            style={{ marginBottom: 0 }}
                                        >
                                            <Input placeholder="Enter School Name" size="middle" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Address */}
                                <Row
                                    gutter={[24, 24]}
                                    style={{
                                        marginBottom: 25,
                                        display: "flex",
                                        alignItems: "start",
                                    }}
                                >
                                    <Col
                                        span={7}
                                        style={{ fontSize: "1rem", fontWeight: 500 }}
                                    >
                                        Address
                                    </Col>
                                    <Col span={15}>
                                        <Form.Item
                                            name="address"
                                            initialValue={`25 Kings Street, CA 89562423934 mountcarmelmailtest@gmail.com`}
                                            style={{ marginBottom: 0 }}
                                        >
                                            <TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Footer Text */}
                                <Row
                                    gutter={[24, 24]}
                                    style={{
                                        marginBottom: 25,
                                        display: "flex",
                                        alignItems: "start",
                                    }}
                                >
                                    <Col
                                        span={7}
                                        style={{ fontSize: "1rem", fontWeight: 500 }}
                                    >
                                        Footer Text
                                    </Col>
                                    <Col span={15}>
                                        <Form.Item
                                            name="footerText"
                                            initialValue="This receipt is computer generated hence no signature is required."
                                            style={{ marginBottom: 0 }}
                                        >
                                            <TextArea rows={4} />
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
                </Card>
            </Col>
        </Row>
    );
};

export default ThermalPrintPage;
