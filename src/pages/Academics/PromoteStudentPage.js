import { Card, Col, Form, Row } from "antd";
import SearchPromoteStudent from "../../components/Academics/PromoteStudent/SearchPromoteStudent";
import { useState } from "react";
import PromoteStudentList from "../../components/Academics/PromoteStudent/PromoteStudentList";

const PromoteStudentPage = () => {
    const [form] = Form.useForm();
    const [showTable, setShowTable] = useState(false);

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
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Select Criteria</span>} style={{ height: 'auto' }}>
                    <SearchPromoteStudent form={form} showTable={showTable} setShowTable={setShowTable} handleSearch={handleSearch}/>
                </Card>
                {showTable && (
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Student List</span>} style={{ height: 'auto', marginTop: "1rem" }}>
                    <PromoteStudentList />
                </Card>)}
            </Col>
        </Row>
    )
}
export default PromoteStudentPage;