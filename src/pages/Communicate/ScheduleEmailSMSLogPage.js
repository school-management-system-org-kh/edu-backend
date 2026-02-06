import { Card, Col, Row } from "antd";
import {useState } from "react";
import { useTranslation } from "react-i18next";
import ScheduleEmailSMSLog from "../../components/Communicate/ScheduleEmailSMSLog";

const ScheduleEmailSMSLogPage = () => {
    const {t} = useTranslation()
    const [data, setData] = useState("")
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("Schedule Email SMS Log")}</span>} style={{ height: 'auto' }}>
                    <ScheduleEmailSMSLog data={data} setData={setData} t={t}/>
                </Card>
            </Col>
        </Row>
    )
}
export default ScheduleEmailSMSLogPage;