import { Button, Col, InputNumber, Row, Switch } from "antd";
import { useState } from "react";
import FileUpload from "../../FileUpload";
import EditorComponent from "../../EditorComponent";

const OnlineAdmissionFormSetting = () => {
    const [onlineAdminSwitch, setOnlineAdminSwitch] = useState(true)
    const [onlineAdminPaySwitch, setOnlineAdminPaySwitch] = useState(true)
    const [onlineAdminFee, setOnlineAdminFee] = useState("")
    return (
        <div className="">
            <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                <Col span={7} style={{ fontSize: "1rem", fontWeight: 500 }}>Online Admission</Col>
                <Col span={17}><Switch value={onlineAdminSwitch} onChange={(e) => { setOnlineAdminSwitch(e) }} /></Col>
            </Row>
            {onlineAdminSwitch &&
                <div className="">
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={7} style={{ fontSize: "1rem", fontWeight: 500 }}>Online Admission Payment Option</Col>
                        <Col span={17}><Switch value={onlineAdminPaySwitch} onChange={(e) => { setOnlineAdminPaySwitch(e) }} /></Col>
                    </Row>
                    {
                        onlineAdminPaySwitch &&
                        <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                            <Col span={7} style={{ fontSize: "1rem", fontWeight: 500 }}>Online Admission Form Fees ($)</Col>
                            <Col span={17}><InputNumber step="0.01" value={onlineAdminFee} onChange={(e) => { setOnlineAdminFee(e) }} defaultValue={100.00} size="middle" style={{ width: "40%" }} /></Col>
                        </Row>
                    }
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex" }}>
                        <Col span={7} style={{ fontSize: "1rem", fontWeight: 500 }}>Upload Admission Application Form</Col>
                        <Col span={17}><FileUpload /></Col>
                    </Row>
                    <div className="" style={{ marginBottom: 25 }}>
                        <sapn style={{ fontSize: "1rem", fontWeight: 500 }}>Online Admission Instructions</sapn>
                        <EditorComponent />
                    </div>
                    <div className="" style={{ marginBottom: 25 }}>
                        <sapn style={{ fontSize: "1rem", fontWeight: 500 }}>Terms & Conditions</sapn>
                        <EditorComponent />
                    </div>
                </div>
            }
            {/* Centered Save button */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Button type="primary" onClick={console.log("save")} style={{ width: "20%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                    Save
                </Button>
            </div>
        </div>
    )
}

export default OnlineAdmissionFormSetting;
