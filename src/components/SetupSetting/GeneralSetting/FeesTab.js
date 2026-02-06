import { Button, Checkbox, Col, Form, Input, Radio, Row } from "antd";
import { useState } from "react";
import EditorComponent from "../../EditorComponent";

const FeesTab = () => {
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
    const options = [
        { label: 'Office Copy ', value: 'officeCopy' },
        { label: 'Student Copy', value: 'studentCopy' },
        { label: 'Bank Copy', value: 'bankCopy' }
    ];
    const onChange = checkedValues => {
        console.log('checked = ', checkedValues);
    };

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
                                span={8}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Offline Bank Payment In Student Panel
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
                                Offline Bank Payment Instruction
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="schoolName"

                                    style={{ marginBottom: 0 }}
                                >
                                    <EditorComponent />
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
                                Lock Student Panel If Fees Remaining
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
                                Print Fees Receipt For
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="currency"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Checkbox.Group options={options} defaultValue={['studentCopy', 'bankCopy']} onChange={onChange} />
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
                                Carry Forward Fees Due Days <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="schoolName1"
                                    rules={[{ required: true, message: "Please enter an Carry Forward Fees Due Days" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="" size="middle" defaultValue={60} />
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
                                Single Page Fees Print
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="status"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="status"
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
                                Collect Fees In Back Date
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="status1"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="status1"
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
                                Student / Guardian Panel Fees Discount
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    name="status2"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Radio.Group
                                        name="status2"
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

export default FeesTab;
