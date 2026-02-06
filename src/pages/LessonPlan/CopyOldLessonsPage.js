import { useState } from "react";
import { Card, Col, Form, Row } from "antd";
import { useTranslation } from "react-i18next";
import SearchOldSession from "../../components/LessonPlan/CopyOldLessonsPage/SearchOldSession";
import OldSessionTableList from "../../components/LessonPlan/CopyOldLessonsPage/OldSessionTableList";

const CopyOldLessonsPage = () => {
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
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("Select Old Session Details")}</span>} style={{ height: 'auto' }}>
                    <SearchOldSession form={form} showTable={showTable} setShowTable={setShowTable} handleSearch={handleSearch} t={t}/>
                    {showTable && (
                    <OldSessionTableList storeData={storeData}/>
                )}
                </Card>
            </Col>
        </Row>
    )
}
export default CopyOldLessonsPage;