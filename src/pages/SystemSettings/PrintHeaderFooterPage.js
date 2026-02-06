import { Card, Col, Row } from "antd";
import PrintHeaderFooterMain from "../../components/SetupSetting/PrintHeaderFooter/PrintHeaderFooterMain";

const PrintHeaderFooterPage = () => {
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>Print Header Footer</span>} style={{ height: 'auto' }}>
                    <PrintHeaderFooterMain />
                </Card>
            </Col>
        </Row>
    )
}
export default PrintHeaderFooterPage;