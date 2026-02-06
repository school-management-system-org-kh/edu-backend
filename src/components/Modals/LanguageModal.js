import { Modal, Button, Form } from "antd";
import InputComponent from "../input/InputComponent";
import { useEffect } from "react";

const LanguageModal = ({
    show, setShow,
    handleSubmit, handleUpdate,
    dataObject, setDataObject,
    isSubmit, setIsSubmit,
    form, id
}) => {

    // Close modal + reset
    const handleClose = () => {
        if(!id){
            form.resetFields();
            setDataObject({ language: "", shortCode: "", countryCode: "", status: true });
            setIsSubmit(false);
        }
        setShow(false);
    };

    // Load edit values into input
    useEffect(() => {
        if (show) {
            form.setFieldsValue({
                language: dataObject.language || "",
                shortCode: dataObject.shortCode || "",
                countryCode: dataObject.countryCode || "",
            });
        }
    }, [show, dataObject, form]);

    return (
        <Modal
            title={<span style={{ fontSize: "1.2rem", fontWeight: 600 }}>{id ? "Update" : "Create"} Language</span>}
            centered
            open={show}
            footer={null}
            onCancel={handleClose}
            width={600}
        >
            <Form form={form} layout="vertical" style={{ rowGap: 12 }}>
                
                {/* Language */}
                <Form.Item
                    label={<span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Language<span style={{ color: "red" }}> *</span></span>}
                    name="language"
                    style={{ marginBottom: 12 }}
                >
                    <InputComponent
                        size="middle"
                        status={isSubmit && !dataObject.language && "error"}
                        value={dataObject.language}
                        setValue={(value) => setDataObject({ ...dataObject, language: value })}
                    />
                </Form.Item>

                {/* Short Code */}
                <Form.Item
                    label={<span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Short Code<span style={{ color: "red" }}> *</span></span>}
                    name="shortCode"
                    style={{ marginBottom: 12 }}
                >
                    <InputComponent
                        size="middle"
                        status={isSubmit && !dataObject.shortCode && "error"}
                        value={dataObject.shortCode}
                        setValue={(value) => setDataObject({ ...dataObject, shortCode: value })}
                    />
                </Form.Item>

                {/* Country Code */}
                <Form.Item
                    label={<span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Country Code<span style={{ color: "red" }}> *</span></span>}
                    name="countryCode"
                    style={{ marginBottom: 12 }}
                >
                    <InputComponent
                        size="middle"
                        status={isSubmit && !dataObject.countryCode && "error"}
                        value={dataObject.countryCode}
                        setValue={(value) => setDataObject({ ...dataObject, countryCode: value })}
                    />
                </Form.Item>

                {/* Save Button */}
                <div style={{ textAlign: "center", marginTop: "24px" }}>
                    <Button
                        type="primary"
                        onClick={id ? handleUpdate : handleSubmit}
                        style={{ width: "20%", fontSize: "1rem", fontWeight: 600 }}
                        size="middle"
                    >
                        Save
                    </Button>
                </div>

            </Form>
        </Modal>
    );
};

export default LanguageModal;
