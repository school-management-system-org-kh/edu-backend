import { Card, Col, Row } from "antd";
import UserMain from "../../components/SetupSetting/Users/UserMain";

const UsersPage = () => {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>Users</span>} style={{ height: 'auto' }}>
                    <UserMain />
                </Card>
            </Col>
        </Row>
    )
}
export default UsersPage;