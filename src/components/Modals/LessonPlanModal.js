import { Modal, Input, Select, Button, Form, Col, Row, DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import UploadBox from "../UploadBox";
import EditorComponent from "../EditorComponent";
import { IoMdAdd } from "react-icons/io";
import StoreImageModal from "./StoreImageModal";

const LessonPlanModal = ({ show, setShow, data, t }) => {
    console.log("data", data)
    const [form] = Form.useForm();
    const [showAddImg, setShowAddImg] = useState(false)

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
    const handleOnChangeSecurity = () => {
        console.log("Yyye")
    }
    const handleChange = (e) => {
        console.log(e);
        // setSubjectData(e);

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
    const today = dayjs();

    return (
        <>
            <Modal
                title={<span style={{ fontSize: "1.2rem" }}>{t("Add Lesson Plan")}</span>}
                centered
                open={show}
                footer={null} // hide default footer
                onCancel={handleClose} // ✅ reset + close on X
                width={1100}
            >
                <Form
                    form={form}
                    layout="vertical"
                    style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
                >
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Lesson")}<span style={{ color: "red" }}> *</span></span>}
                                name="security"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a lesson")) }]}
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

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Topic")}<span style={{ color: "red" }}> *</span></span>}
                                name="port2"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a topic")) }]}
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

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Sub Topic")}<span style={{ color: "red" }}> *</span></span>}
                                name="group"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a topic group")) }]}
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

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Date")}<span style={{ color: "red" }}> *</span></span>}
                                name="subject"
                                style={{ marginBottom: 12 }}
                            >
                                <DatePicker
                                    defaultValue={today} // ✅ must be a Day.js object, not string
                                    format="MM-DD-YYYY"  // ✅ controls how it displays
                                    disabled
                                    size="middle"
                                    width="100%"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Time From")}<span style={{ color: "red" }}> *</span></span>}
                                name="formTime"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a Time From")) }]}
                                style={{ marginBottom: 12 }}
                            >
                                <TimePicker
                                    size="middle"
                                    style={{ width: "100%" }}
                                    defaultValue={dayjs("10:30 AM", "hh:mm A")} // ✅ set default to 10:30 AM
                                    format="hh:mm A" // ✅ 12-hour format with AM/PM
                                />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Time End")}<span style={{ color: "red" }}> *</span></span>}
                                name="endTime"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a Time End")) }]}
                                style={{ marginBottom: 12 }}
                            >
                                <TimePicker
                                    size="middle"
                                    style={{ width: "100%" }}
                                    defaultValue={dayjs("11:15 AM", "hh:mm A")} // ✅ set default to 10:30 AM
                                    format="hh:mm A" // ✅ 12-hour format with AM/PM
                                />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Lecture YouTube URL")}</span>}
                                name="urlYoutube"
                                style={{ marginBottom: 12 }}
                            >
                                <Input size="middle" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Lecture Video")}</span>}
                                name="lectureVideo"
                                style={{ marginBottom: 12 }}
                            >
                                <UploadBox />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Attachment")}</span>}
                                name="attachment"
                                style={{ marginBottom: 12 }}
                            >
                                <UploadBox />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Teaching Method")}</span>}
                                name="teachingMethod"
                                style={{ marginBottom: 12 }}
                            >
                                <Input size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("General Objectives")}</span>}
                                name="generalObjectives"
                                style={{ marginBottom: 12 }}
                            >
                                <Input size="middle" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Previous Knowledge")}</span>}
                                name="previousKnowledge"
                                style={{ marginBottom: 12 }}
                            >
                                <Input size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Comprehensive Questions")}</span>}
                                name="comprehensiveQuestions"
                                style={{ marginBottom: 12 }}
                            >
                                <Input size="middle" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label={
                                    <div className="" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Presentation")}</span>
                                        <Button 
                                            onClick={() => {
                                                setShowAddImg(true)
                                                setShow(false)
                                            }} 
                                            style={{ marginLeft: "52.5rem" }} icon={<IoMdAdd />} color="default" variant="solid"
                                        >Add Image</Button>
                                    </div>
                                }
                                name="presentation"
                                style={{ marginBottom: 12 }}
                            >
                                <EditorComponent />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Centered Save button */}
                    <div style={{ textAlign: "center", marginTop: "24px" }}>
                        <Button type="primary" onClick={handleSave} style={{ width: "20%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
            <StoreImageModal setShowNew={setShow} show={showAddImg} setShow={setShowAddImg} t={t}/>
        </>
    );
};

export default LessonPlanModal;
