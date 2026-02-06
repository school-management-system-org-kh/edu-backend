import { Modal, Input, Select, Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

const { Option } = Select;

const TopicsModal = ({ show, setShow, data }) => {
    console.log("data", data)
    const [form] = Form.useForm();

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
                    name: data.name || "",
                    subject_name: data.subject_name || "",
                    description: data.description || "",
                });
            } else {
                form.resetFields(); // fresh form for "create"
            }
        }
    }, [show, data, form]);

    return (
        <Modal
            title={<span style={{ fontSize: "1.2rem" }}>Create Topics</span>}
            centered
            open={show}
            footer={null} // hide default footer
             onCancel={handleClose} // ✅ reset + close on X
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter a name" }]}
                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                >
                    <Input placeholder="Enter Name" size="middle" />
                </Form.Item>

                <Form.Item
                    label="Subject Name"
                    name="subject_name"
                    rules={[{ required: true, message: "Please select a subject name" }]}
                    style={{ marginBottom: 12 }}
                >
                    <Select placeholder="Select Subject Name" size="middle" allowClear={true}>
                        <Option value="Chemistry">Chemistry</Option>
                        <Option value="Computer Science	">Computer Science</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        { type: "text"},
                    ]}
                    style={{ marginBottom: 12 }}
                >
                    <TextArea rows={5} placeholder="Enter description" size="middle" />
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

export default TopicsModal;
