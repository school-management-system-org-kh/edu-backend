import { Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import EmailSettingMain from "../../components/SetupSetting/EmailSetting/EmailSettingMain";

const EmailSettingPage = () => {
    const { t } = useTranslation();
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>{t("Email Setting")}</span>} style={{ height: 'auto' }}>
                    <EmailSettingMain />
                </Card>
            </Col>
        </Row>
    )
}
export default EmailSettingPage;