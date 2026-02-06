import { Button, Card, Checkbox, Col, Divider, Form, Input, Radio, Row, Select } from "antd";
import { useState } from "react";
import { TimePicker } from "antd";
import StaffAttendanceSetting from "../../StaffAttendanceSetting";
import StudentAttendanceSetting from "../../StudentAttendanceSetting";

const AttendanceTypeTab = () => {
    const [status, setStatus] = useState("disable")
    const [employee, setEmployee] = useState("staff")
    const [form] = Form.useForm();

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
    const classes = [
        { name: "Class 1", sections: ["A", "B", "C", "D"] },
        { name: "Class 2", sections: ["A", "B"] },
    ];
    const [timeValues, setTimeValues] = useState({});

    const handleTimeChange = (className, section, time) => {
        const key = `${className}-${section}`;
        setTimeValues((prev) => ({ ...prev, [key]: time }));
    };

    const capitalizeFirstLetter = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

    return (
        <div>
            <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Attendance Type</span>} style={{ height: 'auto' }}>
                <Form form={form}>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Row
                                gutter={[24, 0]}
                                style={{
                                    marginBottom: 20,
                                    display: "flex",
                                    alignItems: "center",
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
                                    Attendance
                                </Col>
                                <Col span={15}>
                                    <Form.Item
                                        name="timeline"
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Radio.Group
                                            name="timeline"
                                            value={status}
                                            defaultValue="disabled"
                                            onChange={(e) => setStatus(e.target.value)}
                                            options={[
                                                { value: "disabled", label: 'Disabled' },
                                                { value: "enabled", label: 'Enabled' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={24}>
                            <Row
                                gutter={[24, 0]}
                                style={{
                                    marginBottom: 20,
                                    display: "flex",
                                    alignItems: "center",
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
                                    QR Code / Barcode / Biometric Attendance
                                </Col>
                                <Col span={15}>
                                    <Form.Item
                                        name="timeline1"
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Radio.Group
                                            name="timeline1"
                                            value={status}
                                            defaultValue="disabled"
                                            onChange={(e) => setStatus(e.target.value)}
                                            options={[
                                                { value: "disabled", label: 'Disabled' },
                                                { value: "enabled", label: 'Enabled' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={24}>
                            <Row
                                gutter={[24, 0]}
                                style={{
                                    marginBottom: 20,
                                    display: "flex",
                                    alignItems: "center",
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
                                    Devices (Separate By Comma)
                                </Col>
                                <Col span={15}>
                                    <Form.Item
                                        name="mobileNo"
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Input defaultValue="" size="middle" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={24}>
                            <Row
                                gutter={[24, 0]}
                                style={{
                                    marginBottom: 20,
                                    display: "flex",
                                    alignItems: "center",
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
                                    Low Attendance Limit
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name="mobileNo"
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Input defaultValue="75.00" size="middle" addonAfter="%" />
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
            </Card>

            <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Class Attendance Time For Auto Attendance Submission (Day Wise With Cron Setting)</span>} style={{ height: 'auto', marginTop: "1rem" }}>
                <Form form={form}>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Row
                                gutter={[24, 0]}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Checkbox
                                    style={{
                                        fontSize: "1rem",
                                        fontWeight: 500,
                                        lineHeight: "40px",
                                    }}>Copy First Detail For All</Checkbox>
                            </Row>
                        </Col>
                    </Row>
                    <Divider />

                    <Row gutter={24}>
                        <Col span={24}>
                            {classes.map((cls) => (
                                <Row
                                    key={cls.name}
                                    gutter={[24, 0]}
                                    style={{
                                        marginBottom: 20,
                                        display: "flex",
                                        alignItems: "center", // align top
                                    }}
                                >
                                    {/* Left: Class Name (col-9) */}
                                    <Col
                                        span={9}
                                        style={{
                                            fontSize: "1rem",
                                            fontWeight: 500,
                                            lineHeight: "40px",
                                        }}
                                    >
                                        {cls.name}
                                    </Col>

                                    {/* Right: Sections + TimePickers (col-15) */}
                                    <Col span={15}>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.75rem",
                                            }}
                                        >
                                            {cls.sections.map((section) => {
                                                const key = `${cls.name}-${section}`;
                                                return (
                                                    <div
                                                        key={key}
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "0.5rem",
                                                        }}
                                                    >
                                                        <div style={{ width: 20, fontSize: "0.9rem", fontWeight: 500 }}>{section}</div>
                                                        <TimePicker
                                                            use12Hours
                                                            format="h:mm A"
                                                            value={timeValues[key] || null}
                                                            onChange={(time) => handleTimeChange(cls.name, section, time)}
                                                            style={{ width: "50%" }}
                                                            placeholder="Enter time"
                                                            size="middle"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </Col>
                                    <Divider />
                                </Row>
                            ))}
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
            </Card>

            <Card title={
                <div className="" style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>
                        {employee && capitalizeFirstLetter(employee)} Attendance Setting
                    </span>
                    <Select
                        placeholder="Select Language"
                        style={{ width: "20%" }}
                        size="middle"
                        value={employee}
                        options={[
                            { value: "staff", label: "Staff" },
                            { value: "student", label: "Student" },
                        ]}
                        onChange={(e) => setEmployee(e)}
                    />
                </div>
            } style={{ height: 'auto', marginTop: "1rem" }}>
                <Form form={form}>
                    {
                        employee === "staff" ?
                        <StaffAttendanceSetting />
                        :
                        <StudentAttendanceSetting />
                    }

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
            </Card>
        </div>
    );
};

export default AttendanceTypeTab;
