import { Card, Col, Row } from "antd";
import CustomFieldList from "../../components/SetupSetting/CustomFields/CustomFieldList";
import EditCustomField from "../../components/SetupSetting/CustomFields/EditCustomField";

const CustomFieldsPage = () => {
    return (
        <Row gutter={24}>
            <Col span={9}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Edit Custom Field</span>} style={{ height: 'auto' }}>
                    <EditCustomField />
                </Card>
            </Col>
            <Col span={15}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Custom Field List</span>} style={{ height: 'auto' }}>
                    <CustomFieldList />
                </Card>
            </Col>
        </Row>
    )
}
export default CustomFieldsPage;