import { Modal, Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import UploadBox from "../UploadBox";
import EditorComponent from "../EditorComponent";
import { EMAILTEMPLETE_URL } from "../../api/URLs";
import { getDataRequest, postDataRequest, putDataRequest } from "../../api/serviceMethods";
import InputComponent from "../input/InputComponent";

const AddEmailTempleteModal = ({
    show,
    setShow,
    t,
    getEmailTemplete,
    id,
    setId,
    setLoading,
    messageModalRef
}) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [dataObject, setDataObject] = useState({
        title: "",
        message: "",
        attachment: ""
    });

    const handleClose = () => {
        setShow(false);
        setIsSubmit(false);
    };

    // ✅ SIMPLE VALIDATION
    const checkError = () => {
        if (!dataObject.title || !dataObject.message) {
            return "Please fill in all required fields."
        }
        return false
    }

    const insertParams = () => ({
        title: dataObject.title,
        message: dataObject.message,
        attachment: dataObject.attachment
    });

    const addNewValue = (data) => {
        setDataObject({
            title: data?.title || "",
            message: data?.message || "",
            attachment: data?.attachment || ""
        });
    };

    // GET BY ID
    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getDataRequest(`${EMAILTEMPLETE_URL}/${id}`);
                if (res) addNewValue(res);
            } catch {
                messageModalRef.current.showWarningConfirmsAutoClose(
                    "Server Error!",
                    () => { },
                    "",
                    true
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async () => {
        setIsSubmit(true);

        const error = checkError();
        if (error) {
            messageModalRef.current.showWarningConfirms(error, () => { }, "", true);
            return;
        }

        try {
            setLoading(true);
            const res = await postDataRequest(EMAILTEMPLETE_URL, insertParams());

            if (res?.status === 200) {
                messageModalRef.current.showSuccessConfirmsAutoClose(
                    res.message || t("Saved Successfully"),
                    () => {
                        setDataObject({ title: "", message: "", attachment: "" });
                        getEmailTemplete();
                        handleClose();
                    },
                    "",
                    true
                );
            }
        } catch (err) {
            messageModalRef.current.showWarningConfirmsAutoClose(
                err?.message,
                () => { },
                "",
                true
            );
        } finally {
            setLoading(false);
            setIsSubmit(false);
        }
    };

    const handleUpdate = async () => {
        setIsSubmit(true);

        const error = checkError();
        if (error) {
            messageModalRef.current.showWarningConfirms(error, () => { }, "", true);
            return;
        }

        try {
            setLoading(true);
            const res = await putDataRequest(
                `${EMAILTEMPLETE_URL}/${id}`,
                insertParams()
            );

            if (res?.status === 200) {
                messageModalRef.current.showSuccessConfirmsAutoClose(
                    res.message,
                    () => {
                        setDataObject({ title: "", message: "", attachment: "" });
                        setId("");
                        getEmailTemplete();
                        handleClose();
                    },
                    "",
                    true
                );
            }
        } catch (err) {
            messageModalRef.current.showWarningConfirmsAutoClose(
                err?.message,
                () => { },
                "",
                true
            );
        } finally {
            setLoading(false);
            setIsSubmit(false);
        }
    };

    return (
        <Modal
            title={<span style={{ fontSize: "1.2rem" }}>{t("Add Email Template")}</span>}
            centered
            open={show}
            footer={null}
            onCancel={handleClose}
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

                {/* ATTACHMENT */}
                <Col span={24} style={{paddingBottom:"25px"}}>
                    <label className="label16600">{t("Attachment")}</label>
                    <UploadBox
                        value={dataObject.attachment}
                        setValue={(url) =>
                            setDataObject((prev) => ({ ...prev, attachment: url }))
                        }
                    />
                </Col>

                {/* MESSAGE */}
                <Col span={24}>
                    <label className="label16600">
                        {t("Message")} <span style={{ color: "red" }}>*</span>
                    </label>
                    <EditorComponent
                        value={dataObject.message}
                        status={isSubmit && !dataObject.message ? "error" : ""}
                        setValue={(value) =>
                            setDataObject((prev) => ({ ...prev, message: value }))
                        }
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
    );
};

export default AddEmailTempleteModal;
