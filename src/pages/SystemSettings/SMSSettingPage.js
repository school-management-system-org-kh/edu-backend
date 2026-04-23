import { Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import SMSSettingMain from "../../components/SetupSetting/SMSSetting/SMSSettingMain";

const SMSSettingPage = () => {
    const { t } = useTranslation();
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>{t("SMS Setting")}</span>} style={{ height: 'auto' }}>
                    <SMSSettingMain />
                </Card>
            </Col>
        </Row>
    )
}
export default SMSSettingPage;