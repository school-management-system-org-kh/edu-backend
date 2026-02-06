import { Col, Form, Input, Row } from "antd";

const AWSSMSTab = ({ form }) => {
    return (
        <div>
            <Form form={form} layout="vertical">
                <Row gutter={24}>
                    {/* Left: Form Inputs (50%) */}
                    <Col span={12}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Email<span style={{ color: "red" }}> *</span></span>}
                            name="email"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a email") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter Email" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Access Key ID<span style={{ color: "red" }}> *</span></span>}
                            name="access_key"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Access Key ID") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter Access Key ID" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>SMTP Secret Access Key<span style={{ color: "red" }}> *</span></span>}
                            name="secret"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a SMTP Secret Access Key") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input.Password placeholder="Enter SMTP Secret Access Key" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Region</span>}
                            name="region"
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter Region" size="middle" />
                        </Form.Item>
                    </Col>

                    {/* Right: Image Centered (50%) */}
                    <Col
                        span={12}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "16px"
                        }}
                    >

                        <img
                            src={require("../../../assets/aswses.jpg")}
                            alt="SMTP"
                            style={{ maxWidth: "100%", maxHeight: "250px", objectFit: "contain" }}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
export default AWSSMSTab;