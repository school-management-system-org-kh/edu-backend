import { Card, Col, Row } from "antd";
import {useState } from "react";
import { useTranslation } from "react-i18next";
import AddLesson from "../../components/LessonPlan/Lesson/AddLesson";
import LessonList from "../../components/LessonPlan/Lesson/LessonList";

const LessonPage = () => {
    const {t} = useTranslation()
    const [data, setData] = useState("")
    return (
        <Row gutter={24}>
            <Col span={9}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("Add Lesson")}</span>} style={{ height: 'auto' }}>
                    <AddLesson data={data} setData={setData} t={t}/>
                </Card>
            </Col>
            <Col span={15}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("Lesson List")}</span>} style={{ height: 'auto' }}>
                    <LessonList data={data} setData={setData} t={t}/>
                </Card>
            </Col>
        </Row>
    )
}
export default LessonPage;