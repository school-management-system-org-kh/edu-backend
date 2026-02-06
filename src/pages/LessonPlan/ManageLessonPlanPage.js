import { Card, Col, Form, Row } from "antd";
import { useState } from "react";
import SearchTeacherTime from "../../components/LessonPlan/ManageLessonPlan/SearchTeacherTime";
import TeacherTimeTableList from "../../components/LessonPlan/ManageLessonPlan/TeacherTimeTableList";
import { useTranslation } from "react-i18next";

const ManageLessonPlanPage = () => {
    const {t} =useTranslation()
    const [form] = Form.useForm();
    const [showTable, setShowTable] = useState(false);
    const [storeData, setStoreData] = useState("")

    const handleSearch = async () => {
        try {
            const values = await form.validateFields(); 
            setStoreData(values)
            setShowTable(true);
        } catch (err) {
            console.log("Validation failed:", err);
            setShowTable(false); // do not show table if validation fails
        }
    };
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("Manage Lesson Plan")}</span>} style={{ height: 'auto' }}>
                    <SearchTeacherTime form={form} showTable={showTable} setShowTable={setShowTable} handleSearch={handleSearch} t={t}/>
                    {showTable && (
                    <TeacherTimeTableList storeData={storeData}/>
                )}
                </Card>
            </Col>
        </Row>
    )
}
export default ManageLessonPlanPage;