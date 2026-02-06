import { Button, Col, Form, Radio, Row } from "antd";
import { useState } from "react";
import SMTPTab from "./SMTPTab";
import AWSSMSTab from "./AWSSMSTab";

const EmailSettingMain = () => {
    const [form] = Form.useForm();
    const [emailEngine, setEmailEngine] = useState("sendMail")
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
                <Col span={6} style={{ fontSize: "1rem", fontWeight: 500 }}>Email Engine</Col>
                <Col span={18}>
                    <Radio.Group
                        name="radiogroup"
                        value={emailEngine}
                        defaultValue="sendMail"
                        onChange={(e) => setEmailEngine(e.target.value)}
                        options={[
                            { value: "sendMail", label: 'SendMail' },
                            { value: "smtp", label: 'SMTP' },
                            { value: "awsSMS", label: 'ASW SES' },
                        ]}
                    />
                </Col>
            </Row>
            {emailEngine === "smtp" && <SMTPTab form={form}/>}
            {emailEngine === "awsSMS" && <AWSSMSTab form={form}/>}
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
export default EmailSettingMain;