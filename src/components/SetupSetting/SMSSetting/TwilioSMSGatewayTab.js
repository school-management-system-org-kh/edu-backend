import { Col, Form, Input, Row, Select } from "antd";

const TwilioSMSGatewayTab = ({ form }) => {
    const { Option } = Select;
    const handleOnChangeAuth = () => {
        console.log("YYEYEY");
        
    }
    return (
        <div>
            <Form form={form} layout="vertical">
                <Row gutter={24}>
                    {/* Left: Form Inputs (50%) */}
                    <Col span={12}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Twilio Account SID<span style={{ color: "red" }}> *</span></span>}
                            name="user_name"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Twilio Account SID") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter Twilio Account SID" size="middle" />
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Authentication Token<span style={{ color: "red" }}> *</span></span>}
                            name="token"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Authentication Token") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter Authentication Token" size="middle" />
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Registered Phone Number<span style={{ color: "red" }}> *</span></span>}
                            name="server"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Registered Phone Number") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter Registered Phone Number" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Status<span style={{ color: "red" }}> *</span></span>}
                            name="auth"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Status") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Select
                                placeholder="Select a Status"
                                onChange={handleOnChangeAuth}
                                allowClear
                                size="middle"
                                showSearch // 👈 Enables search
                                optionFilterProp="children" // 👈 Filters by the Option's text
                            >
                                <Option value="enabled">Enabled</Option>
                                <Option value="disabled">Disabled</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* Right: Image Centered (50%) */}
                    <Col
                        span={12}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "16px",
                            flexDirection:"column"
                        }}
                    >
                        <img
                            src={require("../../../assets/twilio.png")}
                            alt="SMTP"
                            style={{ maxWidth: "100%", maxHeight: "250px", objectFit: "contain" }}
                        />
                        <a href="https://www.twilio.com" style={{fontSize:"1rem", fontWeight:500, display:"flex", justifyContent:'center'}}>https://www.twilio.com</a>

                    </Col>
                </Row>
            </Form>
        </div>
    )
}
export default TwilioSMSGatewayTab;