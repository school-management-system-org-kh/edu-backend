import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Row, Select, Table } from "antd";
import { useTranslation } from "react-i18next";
import { capitalizedText } from "../../../utils/validators";

const OldSessionTableList = ({ storeData }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const initialData = [
        {
            id: 1,
            title: "First Day at School",
            require: true,
            topics: [
                { id: "1.1", title: "School Life", checked: true },
                { id: "1.2", title: "Chapter 2", checked: false },
                { id: "1.3", title: "School Day's", checked: false },
                { id: "1.4", title: "Chapter-2", checked: false }
            ]
        },
        { id: 2, title: "The Wind and the Sun", require: true, topics: [] },
        { id: 3, title: "Storm in the Garden", require: true, topics: [] },
        { id: 4, title: "The Grasshopper and the Ant", require: true, topics: [] },
        { id: 5, title: "Rain", require: true, topics: [] },
        { id: 6, title: "A Smile", require: false, topics: [] }
    ];
    // <-- use state for the table data
    const [data, setData] = useState(initialData);

    // update a topic checked value inside a chapter
    const onChange = (e, chapterId, topicId) => {
        const checked = e.target.checked;

        const updated = data.map((chapter) =>
            chapter.id === chapterId
                ? {
                    ...chapter,
                    topics: chapter.topics.map((topic) =>
                        topic.id === topicId ? { ...topic, checked } : topic
                    )
                }
                : chapter
        );

        setData(updated);
    };

    const columns = [
        {
            title: t("#"),
            dataIndex: "id",
            width: "10%"
        },
        {
            title: t("Lesson Topic"),
            dataIndex: "topic",
            key: "top",
            render: (_, record) => (
                <>
                    <span style={{ fontWeight: 600 }}>
                        {record?.title}{" "}
                        {record?.require && (
                            <span style={{ color: "red", fontSize: "1rem" }}>*</span>
                        )}
                    </span>

                    <div>
                        {record?.topics.map((item) => (
                            <div key={`${record.id}-${item.id}`} style={{ marginLeft: "1rem" }}>
                                <span style={{ marginRight: 8 }}>{item.id}</span>
                                <Checkbox
                                    checked={item.checked}
                                    style={{ marginLeft: "0.5rem" }}
                                    onChange={(e) => onChange(e, record.id, item.id)}
                                >
                                    {item.title}
                                </Checkbox>
                            </div>
                        ))}
                    </div>
                </>
            )
        }
    ];

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

    const handleChange = (value) => {
        console.log(`selected ${value}`);
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

    return (
        <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ fontWeight: 600 }}>
                {t("Syllabus Status For")}:{" "}
                {storeData && capitalizedText(storeData?.subject)}
            </h3>

            <Row gutter={24}>
                <Col span={16}>
                    <h3 style={{ fontWeight: 600 }}>{t("Lesson & Topics Select Subject")}</h3>

                    <Table
                        dataSource={data}
                        columns={columns}
                        pagination={false}
                        rowKey="id" // important so Table uses stable keys
                        scroll={{
                            y: 390,
                            x: "auto"
                        }}
                    />
                </Col>

                <Col span={8}>
                    <h3 style={{ fontWeight: 600 }}>{t("Select Subject")}</h3>
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
                        {/* Centered Save button */}
                        <div style={{ textAlign: "center", marginTop: "2rem" }}>
                            <Button type="primary" onClick={handleSave} style={{ width: "30%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                                {t("Save")}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default OldSessionTableList;
