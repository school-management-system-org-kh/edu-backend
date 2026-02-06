import { Alert, Button, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

const GeneralSettingTab = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [timezones, setTimezones] = useState([]);
    const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                console.log("Form Values:", values);
                // 👉 Call your API here with `values`
            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };
    const onChange = (date, dateString) => {
        console.log(date && date, dateString);
    };

    const onFormatChange = (value) => {
        setDateFormat(value);
        // reset date if needed: setSelectedDate(null);
    };

    useEffect(() => {
        const getTimezoneOptions = () => {
            const zones = moment.tz.names();

            return zones.map((zone) => {
                const offset = moment.tz(zone).utcOffset();
                const sign = offset >= 0 ? "+" : "-";
                const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
                const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
                const label = `(GMT${sign}${hours}:${minutes}) ${zone}`;
                return { label, value: zone };
            });
        };

        setTimezones(getTimezoneOptions());
    }, []);


    return (
        <div>
            <Alert
                message={
                    <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                        Note: After saving General Setting please once logout then relogin so changes will be come in effect.
                    </span>
                }
                type="info"
                showIcon closable
            />

            <Form form={form}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                marginTop: 20,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={7}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                School Name <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={17}>
                                <Form.Item
                                    name="schoolName"
                                    rules={[{ required: true, message: "Please enter a school name" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="Enter School Name" size="middle" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={12}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                marginTop: 20,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={7}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                School Code <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={17}>
                                <Form.Item
                                    name="schoolCode"
                                    rules={[{ required: true, message: "Please enter a school code" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="Enter School Code" size="middle" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={7}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                Phone <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={17}>
                                <Form.Item
                                    name="phone"
                                    rules={[{ required: true, message: "Please enter a phone" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <InputNumber style={{ width: '100%' }} placeholder="Enter Phone" size="middle" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={12}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={7}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Email <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={17}>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: "Please enter a email" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="Enter email" size="middle" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[24, 0]} style={{ marginBottom: 25, display: "flex", alignItems: "flex-start" }}>
                    <Col
                        span={3}
                        style={{
                            fontSize: "1rem",
                            fontWeight: 500,
                            lineHeight: "40px", // vertically align label
                        }}
                    >
                        Address <span style={{ color: "red" }}>*</span>
                    </Col>
                    <Col span={21}>
                        <Form.Item
                            name="address"
                            rules={[{ required: true, message: "Please enter an address" }]}
                            style={{ marginBottom: 0, marginLeft: "1.34rem" }}
                        >
                            <TextArea row={3} placeholder="Enter Address" size="middle" />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider orientation="left" orientationMargin="0" style={{ fontSize: "1.2rem" }}>Academic Session</Divider>

                <Row gutter={24}>
                    <Col span={12}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                marginTop: 20,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={7}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                Session <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={17}>
                                <Form.Item
                                    name="Session"
                                    rules={[{ required: true, message: "Please enter a session" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <DatePicker placeholder="Enter Session" size="middle" onChange={onChange} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={12}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                marginTop: 20,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={7}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Start Month <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={17}>
                                <Form.Item
                                    name="startDate"
                                    rules={[{ required: true, message: "Please enter a Session Start Month" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <DatePicker placeholder="Enter Session" size="middle" onChange={onChange} style={{ width: "100%" }} picker="month" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider orientation="left" orientationMargin="0" style={{ fontSize: "1.2rem" }}>Date Time</Divider>
                <Row gutter={24}>
                    <Col span={8}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                marginTop: 20,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={10}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                Date Format <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={14}>
                                <Form.Item
                                    name="formatDate"
                                    rules={[{ required: true, message: "Please enter a session" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Select
                                        value={dateFormat ? dateFormat : "MM/DD/YYYY"}
                                        onChange={onFormatChange}
                                        size="middle"
                                        style={{ width: "100%" }}
                                        allowClear={true}
                                    >
                                        <Option value="d-m-Y">dd-mm-yyyy</Option>
                                        <Option value="d-M-Y">dd-mmm-yyyy</Option>
                                        <Option value="d/m/Y">dd/mm/yyyy</Option>
                                        <Option value="d.m.Y">dd.mm.yyyy</Option>
                                        <Option value="m-d-Y">mm-dd-yyyy</Option>
                                        <Option value="m/d/Y" selected="">mm/dd/yyyy</Option>
                                        <Option value="m.d.Y">mm.dd.yyyy</Option>
                                        <Option value="Y/m/d">yyyy/mm/dd</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={8}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                marginTop: 20,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={9}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Timezone <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={15}>
                                <Form.Item
                                    name="Timezone"
                                    rules={[{ required: true, message: "Please enter a Timezone" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Select
                                        showSearch
                                        size="middle"
                                        placeholder="Select Timezone"
                                        style={{ width: '100%' }}
                                        optionFilterProp="label"
                                        allowClear={true}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={timezones}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                marginTop: 20,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={13}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px",
                                }}
                            >
                                Start Day Of Week  <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={11}>
                                <Form.Item
                                    name="week"
                                    rules={[{ required: true, message: "Please enter a Start Day Of Week" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Select
                                        value="monday"
                                        onChange={onFormatChange}
                                        size="middle"
                                        style={{ width: "100%" }}
                                        allowClear={true}
                                    >
                                        <Option value="Monday">Monday</Option>
                                        <Option value="Tuesday">Tuesday</Option>
                                        <Option value="Wednesday">Wednesday</Option>
                                        <Option value="Thursday">Thursday</Option>
                                        <Option value="Friday">Friday</Option>
                                        <Option value="Saturday">Saturday</Option>
                                        <Option value="Sunday">Sunday</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider orientation="left" orientationMargin="0" style={{ fontSize: "1.2rem" }}>Currency</Divider>
                <Row gutter={24}>
                    <Col span={12}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                marginTop: 20,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={9}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                Currency Format <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={15}>
                                <Form.Item
                                    name="currency"
                                    rules={[{ required: true, message: "Please enter a Currency Format " }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Select
                                        value={""}
                                        size="middle"
                                        style={{ width: "100%" }}
                                        allowClear={true}
                                    >
                                        <Option value="####.##">12345678.00</Option>
                                        <Option value="#,###.##">12,345,678.00</Option>
                                        <Option value="#,##,###.##" selected="">1,23,45,678.00</Option>
                                        <Option value="#.###.##">12.345.678.00</Option>
                                        <Option value="#.###,##">12.345.678,00</Option>
                                        <Option value="# ###.##">12 345 678.00 (Not For RTL)</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Divider orientation="left" orientationMargin="0" style={{ fontSize: "1.2rem" }}>File Upload Path</Divider>
                <Row gutter={24}>
                    <Col span={12}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                marginTop: 20,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={9}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                Base Url <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={15}>
                                <Form.Item
                                    name="baseUrl"
                                    rules={[{ required: true, message: "Please enter a Base Url" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="Enter Base Url" size="middle" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row
                            gutter={[24, 0]}
                            style={{
                                marginBottom: 25,
                                marginTop: 20,
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <Col
                                span={9}
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    lineHeight: "40px", // vertically align label
                                }}
                            >
                                File Upload Path <span style={{ color: "red" }}>*</span>
                            </Col>
                            <Col span={15}>
                                <Form.Item
                                    name="filepath"
                                    rules={[{ required: true, message: "Please enter a File Upload Path " }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="Enter File Upload Path " size="middle" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {/* Centered Save button */}
                <div style={{ textAlign: "center", marginTop: "24px" }}>
                    <Button
                        type="primary"
                        onClick={handleSave}
                        style={{ width: "20%", fontSize: "1rem", fontWeight: 600 }}
                        size="middle"
                    >
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default GeneralSettingTab;
