import { Modal, Input, Select, Button, Form, InputNumber } from "antd";
import { useEffect } from "react";

const { Option } = Select;

const PaymentModal = ({ show, setShow, data }) => {
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
                    email: data.email || "",
                    role: data.userType || "",
                });
            } else {
                form.resetFields(); // fresh form for "create"
            }
        }
    }, [show, data, form]);

    return (
        <Modal
            title={<span style={{ fontSize: "1.2rem" }}>Create Payment</span>}
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
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: "Please enter amount" }]}
                >
                    <InputNumber
                        min={1}
                        size="middle"
                        placeholder="Enter amount"
                        style={{ marginBottom: 0,  width: "100%" }}
                    />
                </Form.Item>
                <Form.Item
                    label="Subject Name"
                    name="subject_name"
                    rules={[{ required: true, message: "Please select a role" }]}
                    style={{ marginBottom: 12 }}
                >
                    <Select placeholder="Select subject name" size="middle" allowClear={true}>
                        <Option value="student">Student</Option>
                        <Option value="mentor">Mentor</Option>
                        <Option value="admin">Admin</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Payment Method"
                    name="payment_method"
                    rules={[{ required: true, message: "Please select a payment method" }]}
                    style={{ marginBottom: 12 }}
                >
                    <Select placeholder="Select Role" size="middle" allowClear={true}>
                        <Option value="student">Student</Option>
                        <Option value="mentor">Mentor</Option>
                        <Option value="admin">Admin</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter a name" }]}
                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                >
                    <Input placeholder="Enter Name" size="middle" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter an email" },
                        { type: "email", message: "Please enter a valid email" },
                    ]}
                    style={{ marginBottom: 12 }}
                >
                    <Input placeholder="Enter Email" size="middle" />
                </Form.Item>

                {/* Centered Save button */}
                <div style={{ textAlign: "center", marginTop: "24px" }}>
                    <Button type="primary" onClick={handleSave} style={{ width: "20%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                        Save
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default PaymentModal;
