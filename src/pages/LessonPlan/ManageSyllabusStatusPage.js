import { Card, Col, Form, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchManageSyllabus from "../../components/LessonPlan/ManageSyllabusStatus/SearchManageSyllabus";
import ManageSyllabusStatusList from "../../components/LessonPlan/ManageSyllabusStatus/ManageSyllabusStatusList";
import { capitalizedText } from "../../utils/validators";

const ManageSyllabusStatusPage = () => {
    const {t} = useTranslation()
    const [form] = Form.useForm();
    const [showTable, setShowTable] = useState(false);
    const [subjectData, setSubjectData] = useState("");

    const handleSearch = async () => {
        try {
            const values = await form.validateFields(); // ✅ validates all fields
            console.log("Form values:", values);
            setShowTable(true);
        } catch (err) {
            console.log("Validation failed:", err);
            setShowTable(false); // do not show table if validation fails
        }
    };
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("Select Criteria")}</span>} style={{ height: 'auto' }}>
                    <SearchManageSyllabus t={t} form={form} showTable={showTable} setShowTable={setShowTable} handleSearch={handleSearch} setSubjectData={setSubjectData}/>
                </Card>
                {showTable && (
                <Card title={
                <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{`${t("Syllabus Status For:")} ${capitalizedText(subjectData)}`}</span>
                } 
                style={{ height: 'auto', marginTop: "1rem" }}
                >
                    <ManageSyllabusStatusList t={t}/>
                </Card>)}
            </Col>
        </Row>
    )
}
export default ManageSyllabusStatusPage;