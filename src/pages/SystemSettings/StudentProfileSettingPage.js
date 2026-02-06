import { Card, Col, Row } from "antd";
import StudentProfileSetting from "../../components/SetupSetting/StudentProfileSetting/StudentProfileSetting";

const StudentProfileSettingPage = () => {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>Student Profile Setting</span>} style={{ height: 'auto' }}>
                    {/* <EditorComponent /> */}
                    <StudentProfileSetting />
                </Card>
            </Col>
        </Row>
    )
}
export default StudentProfileSettingPage;