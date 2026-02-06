import { Col, Form, Input, Row, Select } from "antd";

const SMSEgyptTab = ({ form }) => {
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
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Username<span style={{ color: "red" }}> *</span></span>}
                            name="user_name"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Username") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter Username" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Password<span style={{ color: "red" }}> *</span></span>}
                            name="password"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Password") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input.Password placeholder="Enter Password" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Sender ID</span>}
                            name="server"
                            style={{ marginBottom: 12 }}
                        >
                            <Input placeholder="Enter Sender ID" size="middle" />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Type<span style={{ color: "red" }}> *</span></span>}
                            name="type"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Type") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Select
                                placeholder="Select a Type"
                                onChange={handleOnChangeAuth}
                                allowClear
                                size="middle"
                                showSearch // 👈 Enables search
                                optionFilterProp="children" // 👈 Filters by the Option's text
                            >
                                <Option value="local">Local SMS</Option>
                                <Option value="international">International SMS</Option>
                            </Select>
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
                            src={require("../../../assets/sms.png")}
                            alt="SMTP"
                            style={{ maxWidth: "100%", maxHeight: "250px", objectFit: "contain" }}
                        />
                        <a href="https://smseg.com/" style={{fontSize:"1rem", fontWeight:500, display:"flex", justifyContent:'center'}}>https://smseg.com/</a>

                    </Col>
                </Row>
            </Form>
        </div>
    )
}
export default SMSEgyptTab;