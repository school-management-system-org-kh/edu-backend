import { Card, Col, Row } from "antd";
import OnlineAdmissionSettings from "../../components/SetupSetting/OnlineAdmission/OnlineAdmission";

const OnlineAdmissionPage = () => {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>Online Admission</span>} style={{ height: 'auto' }}>
                    {/* <EditorComponent /> */}
                    <OnlineAdmissionSettings />
                </Card>
            </Col>
        </Row>
    )
}
export default OnlineAdmissionPage;