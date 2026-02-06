import { Card, Col, Form, Row } from "antd";
import { useState } from "react";
import LoginCredentialsSend from "../../components/Communicate/LoginCredentialsSend";
import LoginCredentialsSendList from "../../components/Communicate/LoginCredentialsSendList";
import { useTranslation } from "react-i18next";

const LoginCredentialsSendPage = () => {
    const [form] = Form.useForm();
    const {t} = useTranslation()
    const [showTable, setShowTable] = useState(false);

    const handleSearch = async () => {
        try {
            const values = await form.validateFields(); // ✅ validates all fields
            console.log("Form values:", values);
            setShowTable(true);
        } catch (err) {
            console.log("Validation failed:", err);
            setShowTable(false); // do not show table if validation fails
        }
    };
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Select Criteria</span>} style={{ height: 'auto' }}>
                    <LoginCredentialsSend form={form} showTable={showTable} setShowTable={setShowTable} handleSearch={handleSearch}/>
                </Card>
                {showTable && (
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Login Credentials Send List</span>} style={{ height: 'auto', marginTop: "1rem" }}>
                    <LoginCredentialsSendList t={t}/>
                </Card>)}
            </Col>
        </Row>
    )
}
export default LoginCredentialsSendPage;