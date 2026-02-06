import { Button, Card, Col, Form, Input, InputNumber, Radio, Row } from "antd";
import { useState } from "react";

const PaymentMethodsPage = () => {
  const [form] = Form.useForm();
  const [selectedBank, setSelectedBank] = useState("aba");
  const [bankImage, setBankImage] = useState(require('../../assets/aba_bank.png'));


  const handleSave = () => {
    form.validateFields()
      .then((values) => {
        console.log("Payment Method:", values);
        // 👉 API call to save values
      })
      .catch((err) => console.log("Validation Failed:", err));
  };
  const updateBankImage = (bankKey) => {
    switch (bankKey) {
      case "aba":
        setBankImage(require('../../assets/aba_bank.png'));
        break;
      case "acleda":
        setBankImage(require('../../assets/acleda_bank.jpg'));
        break;
      case "chipmong":
        setBankImage(require('../../assets/chip_mong_bank.png'));
        break;
      case "wing":
        setBankImage(require('../../assets/wing_bank.jpg'));
        break;
      default:
        setBankImage(null);
        break;
    }
  };



  return (
    <Row gutter={24}>
      <Col span={24}>
        <Card
          title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Payment Methods</span>}
        >
          <Form form={form} layout="vertical">

            {/* Bank Selection */}
            <Form.Item
              name="bank"
            >
              <Radio.Group
                onChange={(e) => {
                  const selected = e.target.value;
                  setSelectedBank(selected);
                  updateBankImage(selected);
                }}
                style={{ display: "flex", flexDirection: "row", gap: "8px" }}
                defaultValue="aba"
              >
                <Radio value="aba">ABA Bank</Radio>
                <Radio value="acleda">ACLEDA Bank</Radio>
                <Radio value="chipmong">Chip Mong Commercial Bank</Radio>
                <Radio value="wing">Wing Bank</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Conditional account number */}
            {selectedBank && (
              <Row gutter={24}>
                {/* Left: Form Inputs (50%) */}
                <Col span={12}>
                  <Form.Item
                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Account Name<span style={{ color: "red" }}> *</span></span>}
                    name="field_name"
                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a account name") }]}
                    style={{ marginBottom: 12 }}
                  >
                    <Input placeholder="Enter Account Name" size="middle" />
                  </Form.Item>

                  <Form.Item
                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Account Number<span style={{ color: "red" }}> *</span></span>}
                    name="field_number"
                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a account number") }]}
                    style={{ marginBottom: 12 }}
                  >
                    <InputNumber style={{ width: "100%" }} placeholder="Enter Account Number" size="middle" />
                  </Form.Item>

                  <Form.Item
                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Processing Fees Type</span>}
                    name="freeType"
                    style={{ marginBottom: 12 }}
                  >
                    <Radio.Group
                      style={{ display: "flex", flexDirection: "row", gap: "8px" }}
                      defaultValue="none"
                    >
                      <Radio value="none">None</Radio>
                      <Radio value="percentage">Percentage (%)</Radio>
                      <Radio value="amount">Fix Amount ($)</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Percentage/Fix Amount</span>}
                    name="field_percentage"
                    style={{ marginBottom: 12 }}
                  >
                    <InputNumber style={{ width: "100%" }} placeholder="Enter Account Percentage/Fix Amount" size="middle" />
                  </Form.Item>
                </Col>

                {/* Right: Image Centered (50%) */}
                <Col
                  span={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px"
                  }}
                >
                  <img
                    src={bankImage ? bankImage : ""}
                    alt="Bank Logo"
                    style={{ maxWidth: "100%", maxHeight: "250px", objectFit: "contain" }}
                  />
                </Col>
              </Row>
            )}

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
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default PaymentMethodsPage;
