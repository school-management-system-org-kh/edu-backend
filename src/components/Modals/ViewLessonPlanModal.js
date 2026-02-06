import { Modal, Input, Button, Form, Col, Row } from "antd";
import { useEffect, useState } from "react";
import StoreImageModal from "./StoreImageModal";
import { AiOutlineFileExcel } from "react-icons/ai";
import { LiaPrintSolid } from "react-icons/lia";
import * as XLSX from "xlsx";

const ViewLessonPlanModal = ({ show, setShow, data, t }) => {
    const { TextArea } = Input;
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

    const lessonPlanData = {
        class: "Class 1 (A)",
        subject: "English (210)",
        lesson: "First Day at School",
        topic: "School Life",
        sub_topic: "School Days",
        date: "11/10/2025 9:00 AM To 09:45 AM",
        general_objectives: "General Objectives 11/10/2025 9:00 AM To 09:45 AM",
        teaching_method: "Teaching methods are the broader techniques used to help students achieve learning outcomes, while activities are the different ways of implementing.",
        previous_knowledge: "Prior knowledge is the information and educational context a learner already has before they learn new information",
        comprehensive_questions: "Comprehensive Questions context a learner already has before they learn new information",
        presentation: "Presentations are typically demonstrations, introduction, lecture, or speech meant to inform, persuade, inspire, motivate, build goodwill, or present a new idea/product."
    };

    // ----------- EXPORT EXCEL ------------
    const exportToExcel = (lessonPlanData) => {
        // Flatten the lessonPlanData into an array with one row
        const flattenedData = [
            {
                Class: lessonPlanData.class,
                Subject: lessonPlanData.subject,
                Lesson: lessonPlanData.lesson,
                Topic: lessonPlanData.topic,
                "Sub Topic": lessonPlanData.sub_topic,
                Date: lessonPlanData.date,
                "General Objectives": lessonPlanData.general_objectives,
                "Teaching Method": lessonPlanData.teaching_method,
                "Previous Knowledge": lessonPlanData.previous_knowledge,
                "Comprehensive Questions": lessonPlanData.comprehensive_questions,
                Presentation: lessonPlanData.presentation,
            }
        ];

        const worksheet = XLSX.utils.json_to_sheet(flattenedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "LessonPlan");
        XLSX.writeFile(workbook, "LessonPlan.xlsx");
    };

    // ----------- PRINT TABLE ------------
    const printTable = (lessonPlanData) => {
        const htmlContent = `
    <html>
      <head>
        <title>Lesson Plan</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { text-align: center; margin-bottom: 20px; }
          table { border-collapse: collapse; width: 100%; font-size: 14px; }
          th, td { border: 1px solid #ddd; padding: 8px; vertical-align: top; }
          th { background: #f5f5f5; text-align: left; font-weight: bold; }
          .topic { padding-left: 1rem; }
        </style>
      </head>
      <body>
        <h2>Lesson Plan</h2>
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Subject</th>
              <th>Lesson</th>
              <th>Topic</th>
              <th>Sub Topic</th>
              <th>Date</th>
              <th>General Objectives</th>
              <th>Teaching Method</th>
              <th>Previous Knowledge</th>
              <th>Comprehensive Questions</th>
              <th>Presentation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${lessonPlanData.class}</td>
              <td>${lessonPlanData.subject}</td>
              <td>${lessonPlanData.lesson}</td>
              <td>${lessonPlanData.topic}</td>
              <td>${lessonPlanData.sub_topic}</td>
              <td>${lessonPlanData.date}</td>
              <td>${lessonPlanData.general_objectives}</td>
              <td>${lessonPlanData.teaching_method}</td>
              <td>${lessonPlanData.previous_knowledge}</td>
              <td>${lessonPlanData.comprehensive_questions}</td>
              <td>${lessonPlanData.presentation}</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

        const printWindow = window.open("", "", "height=800,width=1000");
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
    };


    return (
        <>
            <Modal
                title={<span style={{ fontSize: "1.2rem" }}>{t("Lesson Plan")}</span>}
                centered
                open={show}
                footer={null} // hide default footer
                onCancel={handleClose} // ✅ reset + close on X
                width={1100}
            >
                <Row
                    gutter={[16, 16]}
                    style={{
                        marginBottom: 25,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Col
                        span={24}
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div
                                style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                                onClick={() => exportToExcel(lessonPlanData)}
                            >
                                <AiOutlineFileExcel size={18} />
                            </div>
                            <div
                                style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                                onClick={() => printTable(lessonPlanData)}
                            >
                                <LiaPrintSolid size={19} />
                            </div>
                        </div>
                    </Col>

                </Row>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
                >
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Class")}</span>}
                                name="security"
                                style={{ marginBottom: 12 }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{lessonPlanData.class}</span>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Subject")}</span>}
                                name="port2"
                                style={{ marginBottom: 12 }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{lessonPlanData.subject}</span>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Lesson")}</span>}
                                name="security"
                                style={{ marginBottom: 12 }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{lessonPlanData.lesson}</span>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Topic")}</span>}
                                name="port2"
                                style={{ marginBottom: 12 }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{lessonPlanData.topic}</span>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Sub Topic")}</span>}
                                name="group"
                                style={{ marginBottom: 12 }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{lessonPlanData.sub_topic}</span>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Date")}</span>}
                                name="subject"
                                style={{ marginBottom: 12 }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{lessonPlanData.date}</span>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("General Objectives")}</span>}
                                name="formTime"
                                style={{ marginBottom: 12 }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{lessonPlanData.general_objectives}</span>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Teaching Method")}</span>}
                                name="endTime"
                                style={{ marginBottom: 12 }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{lessonPlanData.teaching_method}</span>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Previous Knowledge")}</span>}
                                name="urlYoutube"
                                style={{ marginBottom: 12 }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{lessonPlanData.previous_knowledge}</span>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Comprehensive Questions")}</span>}
                                name="teachingMethod"
                                style={{ marginBottom: 12 }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{lessonPlanData.comprehensive_questions}</span>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Presentation")}</span>}
                                name="generalObjectives"
                                style={{ marginBottom: 12 }}
                            >
                                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{lessonPlanData.presentation}</span>
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 600 }}>{t("Comments")}</span>}
                                name="previousKnowledge"
                                style={{ marginBottom: 12 }}
                            >
                                <TextArea
                                    placeholder="Type your comment"
                                    size="middle"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />
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
            <StoreImageModal setShowNew={setShow} show={showAddImg} setShow={setShowAddImg} t={t} />
        </>
    );
};

export default ViewLessonPlanModal;
