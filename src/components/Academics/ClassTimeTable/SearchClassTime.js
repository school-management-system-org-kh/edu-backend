import { Button, Col, Form, Row, Select } from "antd";

const SearchClassTime = ({ form, handleSearch }) => {
    const handleOnChangeSecurity = () => {
        console.log("Yyye")
    }
    const handleChange = () => {
        console.log("YYEYEY");

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

    return (
        <div>
            <Form form={form} layout="vertical">

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Class<span style={{ color: "red" }}> *</span></span>}
                            name="security"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Class") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Select
                                placeholder="Select a Class"
                                onChange={handleOnChangeSecurity}
                                allowClear
                                size="middle"
                                showSearch
                                optionFilterProp="children"
                                options={optionClass}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Section<span style={{ color: "red" }}> *</span></span>}
                            name="port2"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter Section") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Select
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select section"
                                size="middle"
                                onChange={handleChange}
                                options={optionSection}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Button
                        size="middle"
                        style={{ width: "15%", fontSize: "1rem", fontWeight: 600, backgroundColor: "#525252", color: 'white', border: "none" }}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>

            </Form>
        </div>
    )
}
export default SearchClassTime;