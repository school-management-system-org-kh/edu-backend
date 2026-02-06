import { Card, Col, Row } from "antd";
import ModuleMain from "../../components/SetupSetting/Module/ModuleMain";

const ModulePage = () => {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>Modules</span>} style={{ height: 'auto' }}>
                    <ModuleMain />
                </Card>
            </Col>
        </Row>
    )
}
export default ModulePage;