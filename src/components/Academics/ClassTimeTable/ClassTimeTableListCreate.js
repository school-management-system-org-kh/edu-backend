import React, { useRef } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { FaHourglassStart, FaRegClock } from "react-icons/fa";
import ClassTimeWeeklyTab from "./ClassTimeWeeklyTab";

const ClassTimeTableListCreate = () => {
    const [form] = Form.useForm();
    const inputRef = useRef(null);

    return (
        <div className="" style={{ marginTop: "1.5rem" }}>
            <h3 style={{ fontSize: "1.2rem" }}>Select parameter to generate time table quickly</h3>
            <Form form={form} layout="vertical">
                <Row gutter={24}>
                    <Col span={5}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Period Start Time<span style={{ color: "red" }}> *</span></span>}
                            name="security"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Period Start Time") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input
                                type="time"
                                size="middle"
                                allowClear={true}
                                addonAfter={<FaRegClock style={{ cursor: "pointer" }}
                                    onClick={() => inputRef.current?.showPicker?.()} />}
                                className="custom-time-input"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={5}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Duration (minute)<span style={{ color: "red" }}> *</span></span>}
                            name="duration"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter Duration (minute)") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input
                                type="number"
                                min={1}
                                size="middle"
                                allowClear={true}
                                addonAfter={<FaHourglassStart />}
                                className="custom-time-input"
                            />
                        </Form.Item>
                    </Col>

                    <Col span={5}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Interval (minute)<span style={{ color: "red" }}> *</span></span>}
                            name="interval"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter Interval (minute)") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input
                                type="number"
                                min={1}
                                size="middle"
                                allowClear={true}
                                addonAfter={<FaHourglassStart />}
                                className="custom-time-input"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Room No.<span style={{ color: "red" }}> *</span></span>}
                            name="roomNo"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter Room No.") }]}
                            style={{ marginBottom: 12 }}
                        >
                            <Input
                                type="text"
                                size="middle"
                                allowClear={true}
                                className="custom-time-input"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            label={<span style={{ color: "white" }}>.</span>}
                            style={{ marginBottom: 12 }}
                        >
                            <Button
                                size="middle"
                                style={{ width: "50%", fontSize: "1rem", fontWeight: 600, backgroundColor: "#525252", color: 'white', border: "none" }}
                            // onClick={handleSearch}
                            >
                                Apply
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <ClassTimeWeeklyTab />
        </div>
    )
}

export default ClassTimeTableListCreate;