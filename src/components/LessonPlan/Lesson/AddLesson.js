
import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, } from "antd";
import { useEffect, useState } from "react";

const AddTopic = ({t}) => {
    const [form] = Form.useForm();
    // 🧩 Start with one default input
    const [inputs, setInputs] = useState([{ id: Date.now(), value: "" }]);

    // ➕ Add new input
    const handleAdd = () => {
        setInputs([...inputs, { id: Date.now(), value: "" }]);
    };

    // 🗑️ Remove input (but always keep at least one)
    const handleRemove = (id) => {
        if (inputs.length === 1) return; // prevent removing all
        setInputs(inputs.filter((item) => item.id !== id));
    };

    // ✏️ Handle input change
    const handleChangeNew = (id, newValue) => {
        setInputs(
            inputs.map((item) => (item.id === id ? { ...item, value: newValue } : item))
        );
    };

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

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const options = [
        {
            label: 'A',
            value: 'a',
        },
        {
            label: 'B',
            value: 'b',
        },
        {
            label: 'C',
            value: 'c',
        },
        {
            label: 'D',
            value: 'd',
        },
        {
            label: 'E',
            value: 'e',
        },
        {
            label: 'F',
            value: 'f',
        },
    ]

    const optionsClass = [
        {
            label: 'Class A',
            value: 'class_a',
        },
        {
            label: 'Class B',
            value: 'class_b',
        },
        {
            label: 'Class C',
            value: 'class_c',
        },
    ]
    const optionsGroup = [
        {
            label: 'Class 5th Subject Group',
            value: '5th',
        },
        {
            label: 'Class 6th Subject Group',
            value: '6th',
        }
    ]
    const optionsSubject = [
        {
            label: 'Mathematics',
            value: 'mathematics',
        },
        {
            label: 'Science',
            value: 'science',
        }
    ]

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
        >

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Class")}<span style={{ color: "red" }}> *</span></span>}
                name="field_name"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a class")) }]}
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder=""
                    size="middle"
                    onChange={handleChange}
                    options={optionsClass}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Section")}<span style={{ color: "red" }}> *</span></span>}
                name="field_section"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a section")) }]}
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder=""
                    size="middle"
                    onChange={handleChange}
                    options={options}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Subject Group")}<span style={{ color: "red" }}> *</span></span>}
                name="field_group"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a subject group")) }]}
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder=""
                    size="middle"
                    onChange={handleChange}
                    options={optionsGroup}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Subject")}<span style={{ color: "red" }}> *</span></span>}
                name="field_subject"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a subject")) }]}
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder=""
                    size="middle"
                    onChange={handleChange}
                    options={optionsSubject}
                />
            </Form.Item>

            <Button onClick={handleAdd} color="default" variant="solid" style={{ float: "right" }}>
                {t("Add Lesson Name")}
            </Button>
            <div style={{ maxWidth: 600, marginTop: "3rem" }}>
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                    }}
                >
                    <label style={{ fontSize: "1rem", fontWeight: 500 }}>
                        {t("Lesson Name")} <span style={{ color: "red" }}>*</span>
                    </label>
                </div>

                {/* Input Fields */}
                {inputs.map((item, index) => (
                    <div
                        key={item.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 15,
                        }}
                    >

                        <Input
                            placeholder=""
                            size="middle"
                            onChange={(e) => handleChangeNew(item.id, e.target.value)}
                        />
                        {/* Show delete only if more than one input */}
                        {inputs.length > 1 && (
                            <CloseOutlined
                                onClick={() => handleRemove(item.id)}
                                style={{
                                    color: "red",
                                    marginLeft: 8,
                                    cursor: "pointer",
                                    fontSize: 18,
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Centered Save button */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Button type="primary" onClick={handleSave} style={{ width: "30%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                    {t("Save")}
                </Button>
            </div>
        </Form>
    );
}
export default AddTopic