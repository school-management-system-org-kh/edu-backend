import { Col, Form, Input, Row, Select } from "antd";

const ClickatellSmsGatewayTab = ({ form }) => {
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
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Clickatell Username<span style={{ color: "red" }}> *</span></span>}
                            name="user_name"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Clickatell Username") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter Clickatell Username" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Clickatell  Password<span style={{ color: "red" }}> *</span></span>}
                            name="password"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Clickatell Password") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input.Password placeholder="Enter Clickatell Password" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>API Key<span style={{ color: "red" }}> *</span></span>}
                            name="server"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a API Key") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter API Key" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>SMTP Status<span style={{ color: "red" }}> *</span></span>}
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
                            src={require("../../../assets/clickatell.png")}
                            alt="SMTP"
                            style={{ maxWidth: "100%", maxHeight: "250px", objectFit: "contain" }}
                        />
                        <a href="https://www.clickatell.com/" style={{fontSize:"1rem", fontWeight:500, display:"flex", justifyContent:'center'}}>https://www.clickatell.com/</a>

                    </Col>
                </Row>
            </Form>
        </div>
    )
}
export default ClickatellSmsGatewayTab;