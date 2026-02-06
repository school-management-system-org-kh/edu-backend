import { Col, Form, Input, Row, Select } from "antd";

const SMTPTab = ({ form }) => {
    const { Option } = Select;
    const handleOnChangeSecurity = () =>{
        console.log("Yyye")
    }
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
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Email<span style={{ color: "red" }}> *</span></span>}
                            name="email"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a email") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter Email" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>SMTP Username<span style={{ color: "red" }}> *</span></span>}
                            name="user_name"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a SMTP Username") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter SMTP Username" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>SMTP Password<span style={{ color: "red" }}> *</span></span>}
                            name="password"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a SMTP Password") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input.Password placeholder="Enter SMTP Password" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>SMTP Server<span style={{ color: "red" }}> *</span></span>}
                            name="server"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a SMTP server") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input defaultValue="smtp.gmail.com" placeholder="Enter SMTP Server" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>SMTP Port<span style={{ color: "red" }}> *</span></span>}
                            name="port"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a SMTP Port") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input defaultValue="587" placeholder="Enter SMTP Port" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>SMTP Security<span style={{ color: "red" }}> *</span></span>}
                            name="security"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a SMTP Security") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Select
                                placeholder="Select a SMTP Security"
                                onChange={handleOnChangeSecurity}
                                allowClear
                                size="middle"
                                showSearch // 👈 Enables search
                                optionFilterProp="children" // 👈 Filters by the Option's text
                            >
                                <Option value="off">OFF</Option>
                                <Option value="ssl">SSL</Option>
                                <Option value="tsl">TSL</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>SMTP Auth<span style={{ color: "red" }}> *</span></span>}
                            name="auth"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a SMTP Auth") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Select
                                placeholder="Select a SMTP Auth"
                                onChange={handleOnChangeAuth}
                                allowClear
                                size="middle"
                                showSearch // 👈 Enables search
                                optionFilterProp="children" // 👈 Filters by the Option's text
                            >
                                <Option value="off">OFF</Option>
                                <Option value="ssl">ON</Option>
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
                            padding: "16px"
                        }}
                    >
                        <img
                            src={require("../../../assets/smtp.jpg")}
                            alt="SMTP"
                            style={{ maxWidth: "100%", maxHeight: "250px", objectFit: "contain" }}
                        />

                    </Col>
                </Row>
            </Form>
        </div>
    )
}
export default SMTPTab;