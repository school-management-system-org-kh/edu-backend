import { Modal, Button, Form, Radio, Space, Card } from "antd";
import { useEffect, useState } from "react";

const BranchModal = ({ show, setShow, data }) => {
    const [selectedBranch, setSelectedBranch] = useState(1);
    const branchOptions = [
        { id: 1, name: "Home Branch" },
        { id: 2, name: "STEM Mentor School 1" },
        { id: 3, name: "STEM Mentor School 2" },
        { id: 4, name: "STEM Mentor School 3" },
    ];
    const [form] = Form.useForm();

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
                    language: data.language || "",
                    short_code: data.short_code || "",
                    country_code: data.country_code || "",
                });
            } else {
                form.resetFields(); // fresh form for "create"
            }
        }
    }, [show, data, form]);

    return (
        <Modal
            title={<span style={{ fontSize: "1.2rem" }}>Switch Branch</span>}
            style={{ top: 65 }}
            open={show}
            footer={null} // hide default footer
            onCancel={handleClose} // ✅ reset + close on X
            width={600}
        >
            <div style={{ padding: 20, width: "100%", maxWidth: 600, margin: "auto" }}>
                <Radio.Group
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    value={selectedBranch}
                    style={{ width: "100%" }}
                >
                    <Space direction="vertical" style={{ width: "100%" }}>
                        {branchOptions.map((branch) => (
                            <Card
                                key={branch.id}
                                style={{
                                    background:
                                        selectedBranch === branch.id ? "#f0f5ff" : "#fafafa",
                                    borderColor:
                                        selectedBranch === branch.id ? "#4096ff" : "#d9d9d9",
                                    cursor: "pointer",
                                    padding:"0px",
                                    marginBottom:"10px"
                                }}
                                onClick={() => setSelectedBranch(branch.id)}
                            >
                                <Radio value={branch.id} style={{ fontWeight: 600 }}>
                                    {branch.name}
                                </Radio>
                            </Card>
                        ))}
                    </Space>
                </Radio.Group>
            </div>

            {/* Centered Save button */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Button type="primary" onClick={handleSave} style={{ width: "20%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                    Update
                </Button>
            </div>
        </Modal>
    );
};

export default BranchModal;
