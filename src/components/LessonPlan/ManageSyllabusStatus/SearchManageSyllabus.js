import { Button, Col, Form, Row, Select } from "antd";

const SearchManageSyllabus = ({ form, handleSearch, t, setSubjectData }) => {
    const handleOnChangeSecurity = () => {
        console.log("Yyye")
    }
    const handleChange = (e) => {
        console.log(e);
        setSubjectData(e);

    }

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

    const optionSection = [
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
        <div>
            <Form form={form} layout="vertical">
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Class")}<span style={{ color: "red" }}> *</span></span>}
                            name="security"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a class")) }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Select
                                // placeholder="Select a Class"
                                onChange={handleOnChangeSecurity}
                                allowClear
                                size="middle"
                                showSearch
                                optionFilterProp="children"
                                options={optionClass}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Section")}<span style={{ color: "red" }}> *</span></span>}
                            name="port2"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a section")) }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Select
                                allowClear
                                style={{ width: '100%' }}
                                placeholder=""
                                size="middle"
                                onChange={handleChange}
                                options={optionSection}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Subject Group")}<span style={{ color: "red" }}> *</span></span>}
                            name="group"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a subject group")) }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Select
                                // placeholder="Select a Class"
                                onChange={handleOnChangeSecurity}
                                allowClear
                                size="middle"
                                showSearch
                                optionFilterProp="children"
                                options={optionsGroup}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Subject")}<span style={{ color: "red" }}> *</span></span>}
                            name="subject"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a subject")) }]}
                            style={{ marginBottom: 12 }}
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
                    </Col>
                </Row>
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Button
                        size="middle"
                        style={{ width: "15%", fontSize: "1rem", fontWeight: 600, backgroundColor:"#525252", color:'white', border:"none" }}
                        onClick={handleSearch}
                    >
                        {t("Search")}
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export default SearchManageSyllabus;