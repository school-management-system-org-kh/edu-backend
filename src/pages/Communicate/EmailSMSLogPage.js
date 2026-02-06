import { Card, Col, Row } from "antd";
import {useState } from "react";
import { useTranslation } from "react-i18next";
import EmailSMSList from "../../components/Communicate/EmailSMSList";

const EmailSMSLogPage = () => {
    const {t} = useTranslation()
    const [data, setData] = useState("")
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("Email / SMS Log")}</span>} style={{ height: 'auto' }}>
                    <EmailSMSList data={data} setData={setData} t={t}/>
                </Card>
            </Col>
        </Row>
    )
}
export default EmailSMSLogPage;