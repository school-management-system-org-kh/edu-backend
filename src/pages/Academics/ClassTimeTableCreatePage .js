import { Button, Card, Col, Form, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import SearchClassTimeCreate from "../../components/Academics/ClassTimeTable/SearchClassTimeCreate";
import ClassTimeTableListCreate from "../../components/Academics/ClassTimeTable/ClassTimeTableListCreate";

const ClassTimeTableCreatePage = () => {
    const [form] = Form.useForm();
    const [showTable, setShowTable] = useState(false);
    const [storeData, setStoreData] = useState("")
    const navigate = useNavigate();

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
                <Card title={
                    <div className="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontWeight: 600, fontSize: "1.25rem" }}>Create Class Time Table</div>
                        <Button onClick={() => navigate("/academics/timetable")} style={{fontSize:"1rem", fontWeight:600}}><IoMdArrowRoundBack size={19} />Back</Button>
                    </div>
                }
                    style={{ height: 'auto' }}
                >
                    <SearchClassTimeCreate form={form} showTable={showTable} setShowTable={setShowTable} handleSearch={handleSearch} />
                    {showTable && (
                        <ClassTimeTableListCreate storeData={storeData} />
                    )}
                </Card>
            </Col>
        </Row>
    )
}
export default ClassTimeTableCreatePage;