
import { Button, Form, Select, } from "antd";
import { useEffect } from "react";

const AddAssignClassTeacher = () => {
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

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
     const handleChangeClass = (value) => {
        console.log(`selected ${value}`);
    };

    const handleChangeTeacher = (value) => {
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

    const optionClass = [
        {
            label: 'Class 1',
            value: 'class1',
        },
        {
            label: 'Class 2',
            value: 'class2',
        },
        {
            label: 'Class 3',
            value: 'class3',
        },
        {
            label: 'Class 4',
            value: 'class4',
        },
        {
            label: 'Class 5',
            value: 'class5',
        },
    ]

    const optionClassTeacher = [
        {
            label: 'Shivam Verma (9002)',
            value: '9002',
        },
        {
            label: 'Jason Sharlton (90006)',
            value: '90006',
        },
        {
            label: 'Albert Thomas (54545454)',
            value: '54545454',
        }
    ]

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
        >

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Class<span style={{ color: "red" }}> *</span></span>}
                name="field_class"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a class") }]}
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                {/* <Input placeholder="Enter Section" size="middle" /> */}
                <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select class"
                    defaultValue={['class1', 'class2']}
                    size="middle"
                    onChange={handleChangeClass}
                    options={optionClass}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Section<span style={{ color: "red" }}> *</span></span>}
                name="field_section"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a section") }]}
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                {/* <Input placeholder="Enter Section" size="middle" /> */}
                <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select section"
                    defaultValue={['a', 'b']}
                    size="middle"
                    onChange={handleChange}
                    options={options}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Class Teacher<span style={{ color: "red" }}> *</span></span>}
                name="field_teacher"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a teacher") }]}
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                {/* <Input placeholder="Enter Section" size="middle" /> */}
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select teacher"
                    size="middle"
                    onChange={handleChangeTeacher}
                    options={optionClassTeacher}
                />
            </Form.Item>

            {/* Centered Save button */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Button type="primary" onClick={handleSave} style={{ width: "30%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                    Save
                </Button>
            </div>
        </Form>
    );
}
export default AddAssignClassTeacher