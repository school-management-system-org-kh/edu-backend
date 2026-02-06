import { Card, Col, Row } from "antd";
import { useState } from "react";
import AssignClassTeacherList from "../../components/Academics/AssignClassTeacher/AssignClassTeacherList";
import AddAssignClassTeacher from "../../components/Academics/AssignClassTeacher/AddAssignClassTeacher";

const AssignClassTeacherPage = () => {
    const [data, setData] = useState("")
    return (
        <Row gutter={24}>
            <Col span={9}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Assign Class Teacher</span>} style={{ height: 'auto' }}>
                    <AddAssignClassTeacher data={data} setData={setData}/>
                </Card>
            </Col>
            <Col span={15}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Class Teacher List</span>} style={{ height: 'auto' }}>
                    <AssignClassTeacherList data={data} setData={setData}/>
                </Card>
            </Col>
        </Row>
    )
}
export default AssignClassTeacherPage;