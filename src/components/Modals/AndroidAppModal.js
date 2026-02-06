import { Modal, Input, Button, Form } from "antd";
import { useEffect } from "react";

const AndroidAppModal = ({ show, setShow, data }) => {
    console.log("data", data)
    const [form] = Form.useForm();

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                console.log("Saving user:", values);
                form.resetFields();
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
            title={<span style={{ fontSize: "1.2rem" }}>Register your Android App purchase code</span>}
            centered
            open={show}
            footer={null} // hide default footer
             onCancel={handleClose} // ✅ reset + close on X
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ rowGap: 12, marginTop:25 }} // 👈 reduces spacing for all fields
            >
                <Form.Item
                    label={<span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Envato Market Purchase Code For Smart School Android App ( How To Find It? )<span style={{ color: "red" }}> *</span></span>}
                    name="language"
                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("The Purchase Code field is required.") }]}
                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                >
                    <Input placeholder="" size="middle" />
                </Form.Item>

                <Form.Item
                    label={<span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Short Your Email Registered With Envato<span style={{ color: "red" }}> *</span></span>}
                    name="short_code"
                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("The Email field is required.") }]}
                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                >
                    <Input placeholder="" size="middle" />
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

export default AndroidAppModal;
