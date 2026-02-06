import { Card, Col, Row } from "antd";
import SystemFieldsMain from "../../components/SetupSetting/SystemFields/SystemFieldsMain";

const SystemFieldsPage = () => {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>System Fields</span>} style={{ height: 'auto' }}>
                    <SystemFieldsMain />
                </Card>
            </Col>
        </Row>
    )
}
export default SystemFieldsPage;