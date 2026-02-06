import { Button, Col, Form, Radio, Row } from "antd";
import { useState } from "react";
import ClickatellSmsGatewayTab from "./ClickatellSmsGatewayTab";
import TwilioSMSGatewayTab from "./TwilioSMSGatewayTab";
import SMSEgyptTab from "./SMSEgyptTab";

const SMSSettingMain = () => {
    const [form] = Form.useForm();
    const [emailEngine, setEmailEngine] = useState("clickatell_gateway")
    const handleSave = () => {
    form.validateFields()
      .then((values) => {
        console.log("Payment Method:", values);
        // 👉 API call to save values
      })
      .catch((err) => console.log("Validation Failed:", err));
  };
    return(
        <div className="">
            <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                <Col span={6} style={{ fontSize: "1rem", fontWeight: 500 }}>SMS Engine</Col>
                <Col span={18}>
                    <Radio.Group
                        name="radiogroup"
                        value={emailEngine}
                        defaultValue="sendMail"
                        onChange={(e) => setEmailEngine(e.target.value)}
                        options={[
                            { value: "clickatell_gateway", label: 'Clickatell Sms Gateway' },
                            { value: "twilio_gateway", label: 'Twilio SMS Gateway' },
                            { value: "SMS_egypt", label: 'SMS Egypt' },
                        ]}
                    />
                </Col>
            </Row>
            {emailEngine === "clickatell_gateway" && <ClickatellSmsGatewayTab form={form}/>}
            {emailEngine === "twilio_gateway" && <TwilioSMSGatewayTab form={form}/>}
            {emailEngine === "SMS_egypt" && <SMSEgyptTab form={form}/>}
            {/* Save Button */}
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Button
                type="primary"
                size="middle"
                style={{ width: "15%", fontSize: "1rem", fontWeight: 600 }}
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
        </div>
    )
}
export default SMSSettingMain;