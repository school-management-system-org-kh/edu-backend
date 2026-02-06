import { Button, Col, Divider, Form, Input, Radio, Row, Select } from "antd";
import { useState } from "react";

const IDAutoGenerationTab = () => {
    const [status, setStatus] = useState("disable")
    const [form] = Form.useForm();
    const { Option } = Select;

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
                <Divider orientation="left" orientationMargin="0" style={{ fontSize: "1.2rem" }}>Student Admission No. Auto Generation</Divider>
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
                                Auto Admission No. 
                            </Col>
                            <Col span={16}>
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
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                Admission No. Prefix <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="schoolName"
                                    rules={[{ required: true, message: "Please enter an Admission No. Prefix " }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="" size="middle" />
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
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                Admission No. Digit <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="currency"
                                    rules={[{ required: true, message: "Please enter a Admission No. Digit" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Select
                                        value={""}
                                        size="middle"
                                        style={{ width: "100%" }}
                                        allowClear={true}
                                    >
                                        <Option value="101">101</Option>
                                        <Option value="102">102</Option>
                                        <Option value="103" selected="">103</Option>
                                    </Select>
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
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                Admission Start From <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="schoolName1"
                                    rules={[{ required: true, message: "Please enter an Admission Start From" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="" size="middle" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Divider orientation="left" orientationMargin="0" style={{ fontSize: "1.2rem" }}>Staff ID Auto Generation</Divider>
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
                                Auto Staff ID 
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="auto"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="auto"
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
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                               Staff ID Prefix <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="staffPrefix"
                                    rules={[{ required: true, message: "Please enter an Staff ID Prefix " }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="" size="middle" />
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
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                Staff No. Digit <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="staffNo"
                                    rules={[{ required: true, message: "Please enter a Staff No. Digit" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Select
                                        value={""}
                                        size="middle"
                                        style={{ width: "100%" }}
                                        allowClear={true}
                                    >
                                        <Option value="101">101</Option>
                                        <Option value="102">102</Option>
                                        <Option value="103" selected="">103</Option>
                                    </Select>
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
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                Staff ID Start From <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="startFrom"
                                    rules={[{ required: true, message: "Please enter an Staff ID Start From" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="" size="middle" />
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

export default IDAutoGenerationTab;
