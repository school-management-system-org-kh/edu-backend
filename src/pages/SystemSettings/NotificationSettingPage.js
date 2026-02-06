import { Card, Col, Row } from "antd";
import NotificationSettingMain from "../../components/SetupSetting/NotificationSetting/NotificationSettingMain";
import Notifications from "../../store/notificationData";

const NotificationSettingPage = () => {
    const notifications =[...Notifications]
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>Notification Setting</span>} style={{ height: 'auto' }}>
                    <NotificationSettingMain data={notifications} />
                </Card>
            </Col>
        </Row>
    )
}
export default NotificationSettingPage;