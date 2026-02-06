import { Card, Col, Form, Row } from "antd";
import { useState } from "react";
import SearchTeacherTime from "../../components/Academics/TeacherTimeTable/SearchTeacherTime";
import TeacherTimeTableList from "../../components/Academics/TeacherTimeTable/TeacherTimeTableList";

const TeacherTimeTablePage = () => {
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
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Teacher Time Table</span>} style={{ height: 'auto' }}>
                    <SearchTeacherTime form={form} showTable={showTable} setShowTable={setShowTable} handleSearch={handleSearch}/>
                    {showTable && (
                    <TeacherTimeTableList storeData={storeData}/>
                )}
                </Card>
            </Col>
        </Row>
    )
}
export default TeacherTimeTablePage;