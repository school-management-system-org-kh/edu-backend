import { Button, Card, Col, Form, Row } from "antd";
import { useState } from "react";
import ClassTimeTableList from "../../components/Academics/ClassTimeTable/ClassTimeTableList";
import SearchClassTime from "../../components/Academics/ClassTimeTable/SearchClassTime";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ClassTimeTablePage = () => {
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
                    <div className="" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <div style={{ fontWeight: 600, fontSize: "1.25rem" }}>Class Time Table</div>
                        <Button
                            onClick={() => navigate("/academics/timetable/create")}
                            style={{
                                backgroundColor: "#525252",
                                color: "white",
                                border: "none",
                            }}><FaPlus size={19} /></Button>
                    </div>
                }
                    style={{ height: 'auto' }}
                >
                    <SearchClassTime form={form} showTable={showTable} setShowTable={setShowTable} handleSearch={handleSearch} />
                    {showTable && (
                        <ClassTimeTableList storeData={storeData} />
                    )}
                </Card>
            </Col>
        </Row>
    )
}
export default ClassTimeTablePage;