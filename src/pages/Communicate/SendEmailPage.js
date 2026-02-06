import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Select, Space } from "antd";
import EditorComponent from "../../components/EditorComponent";
import MessageConfirmModal from "../../components/Modals/MessageConfirmModal";
import UploadBox from "../../components/UploadBox";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const messageToDataNew = [
    {
        name: "Student"
    },
    {
        name: "Parent"
    },
    {
        name: "Admin"
    },
    {
        name: "Teacher"
    },
    {
        name: "Accountant"
    },
    {
        name: "Librarian"
    },
    {
        name: "Receptionist"
    },
    {
        name: "Super Admin"
    }
]

const SendEmailPage = () => {
    const messageModalRef = useRef('');
    const { Search } = Input;
    const [form] = Form.useForm();
    const { t } = useTranslation()
    const [sendType, setSendType] = useState("group")
    const [searchName, setSearchName] = useState("")
    const [selectedType, setSelectedType] = useState(messageToDataNew[0].name);
    const [items, setItems] = useState([]);
     const [value, setValue] = useState('sendNow');
     const defaultValue = dayjs('2024-01-01');
    const [sectionChecks, setSectionChecks] = useState({
        A: false,
        B: false,
        C: false,
        D: false,
    });
    const [sendToChecks, setSendToChecks] = useState({
        students: false,
        guardians: false,
    });

    const handleAdd = () => {
        if (!searchName.trim()) return;

        const newItem = {
            id: Date.now(),
            type: selectedType,
            name: searchName
        };

        setItems([...items, newItem]);
        setSearchName(""); // clear input
    };

    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
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

    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const handleOnChangeSecurity = (e) => {
        setSendType(e)
    }
    const handleOnChange = (e) => {
        console.log(e)
    }

    const optionTypeSendEmail = [
        {
            label: 'Group',
            value: 'group',
        },
        {
            label: 'Individual',
            value: 'individual',
        },
        {
            label: 'Class',
            value: 'class',
        },
        {
            label: `Today's Birthday`,
            value: 'birthday',
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

    const sectionList = ["A", "B", "C", "D"];
    const sendToList = ["Students", "Guardians"];

    const handleSectionChange = (key) => {
        setSectionChecks(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSendToChange = (key) => {
        setSendToChecks(prev => ({ ...prev, [key]: !prev[key] }));
    };


    const sendEmailType = (value) => {
        switch (value) {
            case "group":
                return (
                    <>
                        {
                            messageToDataNew?.map((mes) => (
                                <div className="">
                                    <Checkbox
                                        // checked={mes.checked}
                                        style={{ marginLeft: "0.5rem" }}
                                    // onChange={(e) => onChange(e, record.id, item.id)}
                                    >
                                        {mes.name}
                                    </Checkbox>
                                </div>
                            ))
                        }
                    </>
                )
            case "individual":
                return (
                    <>
                        <div className="">
                            <Search placeholder="Search...." onSearch={onSearch} style={{ width: "100%" }} />
                            <div style={{ marginTop: "1rem" }}>
                                {items.map(item => (
                                    <div
                                        key={item.id}
                                        style={{
                                            border: "1px solid #d9d9d9",
                                            borderRadius: "8px",
                                            padding: "0.75rem",
                                            marginBottom: "0.5rem",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            background: "#fafafa"
                                        }}
                                    >
                                        <div>
                                            <strong>{item.type}</strong> — {item.name}
                                        </div>
                                        <DeleteOutlined
                                            style={{ fontSize: "1rem", color: "#e60b29", cursor: "pointer" }}
                                            onClick={() => handleDelete(item.id)}
                                        />

                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )
            case "class":
                return (
                    <>

                            {/* Header */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    fontWeight: 600,
                                    marginBottom: "0.5rem"
                                }}
                            >
                                <span>Section</span>
                                <span>Send To</span>
                            </div>

                            {/* Section rows using map */}
                            {sectionList.map((section, index) => (
                                <div
                                    key={section}
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        marginBottom: "0.5rem"
                                    }}
                                >
                                    {/* Left column: Section */}
                                    <Checkbox
                                        checked={sectionChecks[section] || false}
                                        onChange={() => handleSectionChange(section)}
                                    >
                                        {section}
                                    </Checkbox>

                                    {/* Right column: Only show send-to options on A + B */}
                                    {index < sendToList.length ? (
                                        <Checkbox
                                            checked={sendToChecks[sendToList[index]] || false}
                                            onChange={() => handleSendToChange(sendToList[index])}
                                        >
                                            {sendToList[index]}
                                        </Checkbox>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            ))}
                    </>
                )

            case "birthday":
                return <></>
            default:
                break;
        }
    }

    const optionSend = [
        { label: 'Send Now ', value: 'sendNow' },
        { label: 'Schedule', value: 'schedule' },
    ];

    const onChange = ({ target: { value } }) => {
        setValue(value);
    };

     const onChangeDate = (_, dateStr) => {
    console.log('onChange:', dateStr);
  };

    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card
                    title={
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                textAlign: "left"      // FIX
                            }}
                        >
                            <span style={{ fontWeight: 600, fontSize: "1.25rem", marginLeft: "0.5rem" }}>
                                {t("Send Email")}
                            </span>

                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Select type send email")}</span>}
                                name="selectTypeEmail"
                                style={{ marginBottom: 0 }} // Important to prevent form-item extra space
                            >
                                <Select
                                    onChange={handleOnChangeSecurity}
                                    allowClear
                                    defaultValue="group"
                                    size="middle"
                                    showSearch
                                    optionFilterProp="children"
                                    options={optionTypeSendEmail}
                                    style={{ width: "10rem" }}
                                />
                            </Form.Item>
                        </div>
                    }

                    style={{ height: 'auto' }}>
                    <Row gutter={24}>
                        <Col span={18}>
                            <Form
                                form={form}
                                layout="vertical"
                                style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
                            >
                                <Form.Item
                                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Email Templete")}<span style={{ color: "red" }}> *</span></span>}
                                    name="email"
                                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select a email templete")) }]}
                                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Title")}<span style={{ color: "red" }}> *</span></span>}
                                    name="title"
                                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please input a title")) }]}
                                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Attachment")}</span>}
                                    name="attachment"
                                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                                >
                                    <UploadBox />
                                </Form.Item>

                                <Form.Item
                                    label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Message")}<span style={{ color: "red" }}> *</span></span>}
                                    name="message"
                                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please input a message")) }]}
                                    style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                                >
                                    <EditorComponent />
                                </Form.Item>
                            </Form>
                        </Col>

                        <Col span={6}>
                            <h3 style={{ fontWeight: 600 }}>{t("Message To")}<span style={{ color: "red" }}> *</span></h3>
                            {sendType === "individual" ? <Space.Compact style={{ width: "18.3rem", paddingBottom: "1rem" }}>
                                <Select
                                    style={{ width: "10rem" }}
                                    value={selectedType}
                                    onChange={(value) => setSelectedType(value)}
                                    options={messageToDataNew.map(item => ({
                                        label: item.name,
                                        value: item.name
                                    }))}
                                />

                                <Input
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                />

                                <Button
                                    style={{
                                        width: "5rem",
                                        background: "#5A5A5A",
                                        borderColor: "#5A5A5A",
                                        borderRadius: "0 8px 8px 0",
                                    }}
                                    type="primary"
                                    onClick={handleAdd}
                                >
                                    Add
                                </Button>
                            </Space.Compact> : ""
                            }

                            {
                                sendType === "class" ?
                                    <div className="" style={{ paddingBottom: "1rem" }}>
                                        <Select
                                            onChange={handleOnChange}
                                            defaultValue="class1"
                                            size="middle"
                                            showSearch
                                            allowClear
                                            optionFilterProp="children"
                                            options={optionClass}
                                            style={{ width: "100%" }}
                                        /> </div> : ""
                            }

                            <div className="bgMessCard">
                                {sendEmailType(sendType)}
                            </div>
                        </Col>
                    </Row>
                    {/* Centered Save button */}
                    <div style={{ textAlign: "center", marginTop: "2rem", display:'flex', justifyContent:'center', alignItems:'center' }}>
                        <Radio.Group options={optionSend} onChange={onChange} value={value} />
                        <Row>
                            <Col span={23}>
                            {
                            value=== "schedule" && 
                            <Form.Item
                                    label={<span style={{ fontSize: "14px", fontWeight: 500 }}>{t("Schedule Date Time")}<span style={{ color: "red" }}> *</span></span>}
                                    name="date"
                                    rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please select schedule date time")) }]}
                                    style={{ marginBottom: 0 }} // 👈 reduce bottom spacing
                                >
                                    <DatePicker defaultValue={defaultValue} showTime onChange={onChangeDate} />
                                </Form.Item>
                        }
                            </Col>
                        </Row>
                        <Button type="primary" onClick={() => handleSave()} style={{ width: "10%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                            {t("Send")}
                        </Button>
                    </div>
                </Card>
            </Col>

            <MessageConfirmModal textCentered ref={messageModalRef} />
        </Row>
    )
}

export default SendEmailPage;