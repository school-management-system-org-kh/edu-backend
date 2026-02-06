import { Card, Col, Row } from "antd";
import SMSSettingMain from "../../components/SetupSetting/SMSSetting/SMSSettingMain";

const SMSSettingPage = () => {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>SMS Setting</span>} style={{ height: 'auto' }}>
                    <SMSSettingMain />
                </Card>
            </Col>
        </Row>
    )
}
export default SMSSettingPage;