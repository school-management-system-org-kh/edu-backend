import { Card, Col, Row } from "antd";
import EmailSettingMain from "../../components/SetupSetting/EmailSetting/EmailSettingMain";

const EmailSettingPage = () => {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>Email Setting</span>} style={{ height: 'auto' }}>
                    <EmailSettingMain />
                </Card>
            </Col>
        </Row>
    )
}
export default EmailSettingPage;