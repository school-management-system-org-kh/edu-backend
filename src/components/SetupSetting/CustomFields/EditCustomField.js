
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { useEffect } from "react";

const EditCustomField = () => {
    const { TextArea } = Input;
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

    useEffect(() => {
    }, [form]);

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
        >
            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Field Belongs To<span style={{ color: "red" }}> *</span></span>}  // 👈 custom label with red *
                name="field_belongs"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please select a field belongs to") }]}
                // rules={[{ required: false, message: "" }]}
                style={{ marginBottom: 12 }}
            >
                <Select
                    placeholder="Select Field Belongs To"
                    size="middle"
                    allowClear={true}
                    options={[
                        { value: "student", label: "Student" },
                        { value: "staff", label: "Staff" },
                    ]}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Field Type<span style={{ color: "red" }}> *</span></span>}  // 👈 custom label with red *
                name="field_type"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please select a field type") }]}
                style={{ marginBottom: 12 }}
            >
                <Select
                    placeholder="Select Field Type"
                    size="middle"
                    allowClear={true}
                    options={[
                        { value: "input", label: "Input" },
                        { value: "number", label: "Number" },
                        { value: "dropdown", label: "Dropdown" },
                        { value: "checkbox", label: "Checkbox" },
                        { value: "textarea", label: "TextArea" },
                        { value: "multiselect", label: "Multi Select" },
                        { value: "date_picker", label: "Date Picker" },
                        { value: "date_picker_time", label: "Datetime Picker" },
                        { value: "colorpicker", label: "Color Picker" },
                        { value: "link", label: "Hyperlink" },
                    ]}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Field Name<span style={{ color: "red" }}> *</span></span>}
                name="field_name"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a field name") }]}
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <Input placeholder="Enter Field Name" size="middle" />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Grid (Bootstrap Column eg. 6) - Max is 12</span>}
                name="bootstrap"
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <InputNumber addonBefore="col-md-" style={{ width: '100%' }} size="middle" min={1} max={12} />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Field Values (Separate By Comma)</span>}
                name="field_value"
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <TextArea rows={3} />
            </Form.Item>
            <Row gutter={24}>
                <Col span={9}>
                    <Form.Item
                        label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Validation</span>}
                        name="validation"
                        style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                    >
                        <Checkbox >Required</Checkbox>
                    </Form.Item>
                </Col>
                <Col span={9}>
                    <Form.Item
                        label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Visibility</span>}
                        name="visibility"
                        style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                    >
                        <Checkbox >On Table</Checkbox>
                    </Form.Item>
                </Col>
            </Row>

            {/* Centered Save button */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Button type="primary" onClick={handleSave} style={{ width: "30%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                    Save
                </Button>
            </div>
        </Form>
    );
}
export default EditCustomField