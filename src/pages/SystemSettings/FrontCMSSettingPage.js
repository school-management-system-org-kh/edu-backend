import { Card, Col, Row } from "antd";
import FrontCMSSettingFrom from "../../components/SetupSetting/FrontCMSSetting/FrontCMSSettingFrom";

const FrontCMSSettingPage = () => {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card 
                    title={<div style={{ position: "sticky", top: 0, zIndex: 1, fontWeight:600, fontSize:"1.25rem" }}>Front CMS Setting</div>}
                    style={{ height: 720 }} // fixed height for scrolling
                    bodyStyle={{ height: "640px", overflowY: "auto" }} // scrollable content
                >
                    <FrontCMSSettingFrom />
                </Card>
            </Col>
        </Row>
    )
}
export default FrontCMSSettingPage;