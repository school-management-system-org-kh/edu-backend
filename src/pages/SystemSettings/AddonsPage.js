import { Card, Col, Row } from "antd";
import AddonsMain from "../../components/SetupSetting/Addons/AddonsMain";

const AddonsPage = () => {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card
                    title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Addons</span>}
                >
                    <AddonsMain />
                </Card>
            </Col>
        </Row>
    )
}
export default AddonsPage;