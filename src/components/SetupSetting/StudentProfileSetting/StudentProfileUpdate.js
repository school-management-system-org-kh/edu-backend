import { Button, Col, Radio, Row } from "antd";
import { useState } from "react";
import AllowedEditFormFieldsTable from "./AllowedEditFormFieldsTable";

const StudentProfileUpdate = () => {
      const [editable, setEditable] = useState("disabled");
    return (
        <div className="">
            <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                <Col span={6} style={{ fontSize: "1rem", fontWeight: 500 }}>Allow Editable Form Fields</Col>
                <Col span={18}>
                    <Radio.Group
                        name="radiogroup"
                        value={editable}
                        onChange={(e) => setEditable(e.target.value)}
                        options={[
                            { value: "disabled", label: 'Disabled' },
                            { value: "enabled", label: 'Enabled' },
                        ]}
                    />
                    <Button size="middle" type="primary" onClick={console.log("save")} style={{ width: "10%", fontSize: "1rem", fontWeight: 600, marginLeft:"1rem" }}>
                        Save
                    </Button>
                </Col>
            </Row>
            {editable === "enabled" && <AllowedEditFormFieldsTable />}
        </div>
    )
}

export default StudentProfileUpdate;
