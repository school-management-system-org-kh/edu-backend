import { Modal, Input, Button, Form, Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { SMSTEMPLETE_URL } from "../../api/URLs";
import { getDataRequest, postDataRequest, putDataRequest } from "../../api/serviceMethods";
import InputComponent from "../input/InputComponent";
import TextAreaComponent from "../input/TextAreaComponent";

const AddSMSTempleteModal = ({ show, setShow, data, t, getSMSTemplete, id, setId, setLoading, messageModalRef }) => {
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false)
    const [dataObject, setDataObject] = useState({
        title: "",
        message: ""
    });

    const handleClose = () => {
        setShow(false);
        setIsSubmit(false);
    };

    const checkError = () => {
        if (!dataObject.title || !dataObject.message) {
            return "Please fill in all required fields."
        }
        return false
    }

    const addNewValue = (data) => {
        setDataObject({
            title: data?.title,
            message: data?.message,
        });

        // IMPORTANT: sync AntD form
        form.setFieldsValue({
            title: data?.title,
            message: data?.message,
        });
    };

    // update section
    const insertParams = () => {
        const sectionPayload = {
            title: dataObject.title,
            message: dataObject.message,
        }
        return sectionPayload
    }

    const handleSubmit = async () => {
        setIsSubmit(true)
        const error = checkError();
        if (error) {
            messageModalRef.current.showWarningConfirms(
                error
                ,
                () => { }, "", true
            );
            return false;
        }
        setLoading(true);
        const sectionPayload = insertParams()
        try {
            const res = await postDataRequest(SMSTEMPLETE_URL, sectionPayload);
            if (res?.status === 200) {
                messageModalRef.current.showSuccessConfirmsAutoClose(
                    res.message || t("Saved Successfully"),
                    () => {
                        setDataObject({ title: "", message: "" });
                        getSMSTemplete();
                        handleClose();
                    },
                    "",
                    true
                );
            } else {
                messageModalRef.current.showWarningConfirmsAutoClose(res.message, () => { }, "", true);
            }
        } catch (err) {
            messageModalRef.current.showWarningConfirmsAutoClose(err && err.message, () => { }, "", true);
        } finally {
            setLoading(false);
            setIsSubmit(false);
        }
    }

    // get section Id
    const getSectionById = async () => {
        try {
            setLoading(true);
            await getDataRequest(`${SMSTEMPLETE_URL}/${id && id}`)
                .then((res) => {
                    if (res) {
                        addNewValue(res)
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
            messageModalRef.current.showWarningConfirmsAutoClose('Server Error!', () => { }, "", true);
        }
    }
    useEffect(() => {
        if (id && id) { getSectionById() }
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        const error = checkError();
        if (error) {
            messageModalRef.current.showWarningConfirms(
                error
                ,
                () => { }, "", true
            );
            return false;
        }
        try {
            const sectionPayload = insertParams()
            setLoading(true);
            await putDataRequest(`${SMSTEMPLETE_URL}/${id && id} `, sectionPayload)
                .then((res) => {
                    if (res.status === 200) {
                        setLoading(false);
                        messageModalRef.current.showSuccessConfirmsAutoClose(
                            res.message,
                            () => {
                                setDataObject({ title: "", message: "", attachment: "" });
                                setId("");
                                getSMSTemplete();
                                handleClose();
                            },
                            "",
                            true
                        );

                    } else {
                        messageModalRef.current.showWarningConfirmsAutoClose(res && res.message, () => { }, "", true);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    messageModalRef.current.showWarningConfirmsAutoClose(err && err.message, () => { }, "", true);
                });
        } catch (error) {
            setLoading(false);
            messageModalRef.current.showWarningConfirmsAutoClose('Server Error!', () => { }, "", true);
        }
    }


    return (
        <>
            <Modal
                title={<span style={{ fontSize: "1.2rem" }}>{id ? t("Edit SMS Template") : t("Add SMS Template")}</span>}
                centered
                open={show}
                footer={null} // hide default footer
                onCancel={handleClose} // ✅ reset + close on X
                width={800}
            >
                <Row gutter={[24, 12]}>
                    {/* TITLE */}
                    <Col span={24}>
                        <label className="label16600">
                            {t("Title")} <span style={{ color: "red" }}>*</span>
                        </label>
                        <InputComponent
                            size="middle"
                            placeholder=""
                            value={dataObject.title}
                            status={isSubmit && !dataObject.title ? "error" : ""}
                            setValue={(value) =>
                                setDataObject((prev) => ({ ...prev, title: value }))
                            }
                        />
                    </Col>

                    {/* MESSAGE */}
                    <Col span={24}>
                        <label className="label16600">
                            {t("Message")} <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextAreaComponent
                            size="middle"
                            rows={8}
                            status={isSubmit && !dataObject.message && "error"}
                            value={dataObject.message}
                            setValue={(value) => {
                                setDataObject({ ...dataObject, message: value })
                                form.setFieldValue("message", value);
                            }}
                        />
                    </Col>
                </Row>

                {/* BUTTON */}
                <div style={{ textAlign: "center", marginTop: 24 }}>
                    <Button
                        type="primary"
                        onClick={id ? handleUpdate : handleSubmit}
                        style={{ width: "30%", fontSize: "1rem", fontWeight: 600 }}
                    >
                        {id ? "Update" : "Save"}
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default AddSMSTempleteModal;
