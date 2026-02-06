import { Card, Col, Row } from "antd";
import {useState } from "react";
import { useTranslation } from "react-i18next";
import AddTopic from "../../components/LessonPlan/Topic/AddTopic";
import TopicList from "../../components/LessonPlan/Topic/TopicList";

const TopicPage = () => {
    const {t} = useTranslation()
    const [data, setData] = useState("")
    return (
        <Row gutter={24}>
            <Col span={9}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("Add Topic")}</span>} style={{ height: 'auto' }}>
                    <AddTopic data={data} setData={setData} t={t}/>
                </Card>
            </Col>
            <Col span={15}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("Topic List")}</span>} style={{ height: 'auto' }}>
                    <TopicList data={data} setData={setData} t={t}/>
                </Card>
            </Col>
        </Row>
    )
}
export default TopicPage;