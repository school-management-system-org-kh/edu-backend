import { Button, Col, Form, Row, Select } from "antd";

const SearchTeacherTime = ({ form, handleSearch, t }) => {
    const handleOnChangeSecurity = () => {
        console.log("Yyye")
    }

    const optionClassTeacher = [
        {
            label: 'Shivam Verma (9002)',
            value: 'Shivam Verma (9002)',
        },
        {
            label: 'Jason Sharlton (90006)',
            value: 'Jason Sharlton (90006)',
        },
        {
            label: 'Albert Thomas (54545454)',
            value: 'Albert Thomas (54545454)',
        }
    ]

    return (
        <div>
            <Form form={form} layout="vertical">
                <Row gutter={24}>
                    <Col span={12}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Form.Item
                                label={
                                    <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                                        {t("Teacher")}<span style={{ color: "red" }}> *</span>
                                    </span>
                                }
                                name="security"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please enter a Teacher")) }]}
                                style={{ marginBottom: 12, flex: 1 }}
                            >
                                <Select
                                    placeholder={t("Select a Teacher")}
                                    onChange={handleOnChangeSecurity}
                                    allowClear
                                    size="middle"
                                    showSearch
                                    optionFilterProp="children"
                                    options={optionClassTeacher}
                                />
                            </Form.Item>

                            <Button
                                size="middle"
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    backgroundColor: "#525252",
                                    color: "white",
                                    border: "none",
                                    marginTop:'1.3rem'
                                }}
                                onClick={handleSearch}
                            >
                                {t("Search")}
                            </Button>
                        </div>
                    </Col>
                </Row>

            </Form>
        </div>
    )
}
export default SearchTeacherTime;