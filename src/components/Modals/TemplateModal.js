import { Modal, Input, Button, Form } from "antd";
import { useEffect } from "react";

const TemplateModal = ({ show, setShow, data }) => {
    console.log("dataTeamldl", data)
    const [form] = Form.useForm();
    const { TextArea } = Input;

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                console.log("Saving user:", values);
                form.resetFields();
                setShow(false);
            })
            .catch((info) => {
                console.log("Validation Failed:", info);
            });
    };
    const handleClose = () => {
        form.resetFields(); // ✅ clears values on close
        setShow(false);
    };

    useEffect(() => {

        if (show) {
            if (data && data.key) {
                form.setFieldsValue({
                    language: data.language || "",
                    short_code: data.short_code || "",
                    country_code: data.country_code || "",
                });
            } else {
                form.resetFields(); // fresh form for "create"
            }
        }
    }, [show, data, form]);

    return (
        <Modal
            title={<span style={{ fontSize: "1.2rem" }}>Template</span>}
            centered
            open={show}
            footer={null} // hide default footer
             onCancel={handleClose} // ✅ reset + close on X
            width={700}
        >
            {/* <span style={{fontSize:"1rem", fontWeight:500, color:"blue"}}>{data.event ? data.event :""}</span> */}
            <Form
                form={form}
                layout="vertical"
                style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
            >
                <Form.Item
                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Subject<span style={{ color: "red" }}> *</span></span>}
                    name="subject"
                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Subject") }]}
                    style={{ marginBottom: 12 }}
                  >
                    <Input value={data.event} defaultValue={data.event} placeholder="Enter Subject" size="middle" />
                  </Form.Item>

                <Form.Item
                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Template ID (This field is reqiured Only For Indian SMS Gateway)</span>}
                    name="short_code"
                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                >
                    <Input placeholder="Enter Template ID (This field is reqiured Only For Indian SMS Gateway)" size="middle" />
                </Form.Item>
                <Form.Item
                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Template<span style={{ color: "red" }}> *</span></span>}
                    name="allowed_extension"
                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Template") }]}
                    style={{ marginBottom: 12 }}
                >
                    <TextArea
                        defaultValue={data.sampleMessage}
                        value={data.sampleMessage}
                        onChange={(e) => console.log("yeys")}
                        rows={4}
                    />
                </Form.Item>

                {/* Centered Save button */}
                <div style={{ textAlign: "center", marginTop: "24px" }}>
                    <Button type="primary" onClick={handleSave} style={{ width: "20%", fontSize:"1rem", fontWeight:600 }} size="middle">
                        Save
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default TemplateModal;
