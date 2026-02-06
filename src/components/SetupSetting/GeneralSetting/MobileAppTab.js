import { Button, Col, Form, Input, Row } from "antd";
import AndroidAppModal from "../../Modals/AndroidAppModal";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const MobileAppTab = () => {
    const [show, setShow] = useState(false)
    const [data, setData] = useState("")
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
                <Row gutter={24}>
                    <Col span={24}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between", // ✅ space between
                            }}
                        >
                            <Col
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                User Mobile App
                            </Col>
                            <Col onClick={() => setShow(true)}>
                                <Button
                                    size="middle"
                                    style={{ fontSize: "1rem", fontWeight: 500 }}
                                >
                                   <FaPlus /> Register Your Android App
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={9}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                User Mobile App API URL
                            </Col>
                            <Col span={15}>
                                <Form.Item
                                    name="apiURL"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input defaultValue="https://demo.stem-montor-admin.in/api/" placeholder="Enter User Mobile App API URL" size="middle" />
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
                                marginBottom: 25,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={9}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                User Mobile App Primary Color Code
                            </Col>
                            <Col span={15}>
                                <Form.Item
                                    name="colorCode"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input defaultValue="#424242" placeholder="Enter User Mobile App Primary Color Code" size="middle" />
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
                                marginBottom: 25,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={9}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                User Mobile App Secondary Color Code
                            </Col>
                            <Col span={15}>
                                <Form.Item
                                    name="colorCodeSec"
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input defaultValue="#E7F1EE" placeholder="Enter User Mobile App Secondary Color Code" size="middle" />
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
            <AndroidAppModal
                show={show} setShow={setShow}
                data={data} setData={setData}
            />
        </div>
    );
};

export default MobileAppTab;
