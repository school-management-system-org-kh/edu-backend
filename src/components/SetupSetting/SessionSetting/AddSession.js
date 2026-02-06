
import { Button, Form, Input, } from "antd";
import { useEffect, useRef, useState } from "react";
import InputComponent from "../../input/InputComponent";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";
import { getDataRequest, postDataRequest, putDataRequest } from "../../../api/serviceMethods";
import { SESSION_URL } from "../../../api/URLs";
import { useTranslation } from "react-i18next";

const AddSession = ({ getListSession, id, setId, setLoading }) => {
    const messageModalRef = useRef('');
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false)
    const { t } = useTranslation();
    const [dataObject, setDataObject] = useState({
        name: "",
        status: true
    });
    console.log("dataObject", dataObject)


    const checkError = () => {
        if (!dataObject.name) {
            return "Please fill in all required fields."
        }
        return false
    }

    const addNewValue = (data) => {
        setDataObject({
            name: data?.name,
            status: data?.status,
        });

        // IMPORTANT: sync AntD form
        form.setFieldsValue({
            name: data?.name,
        });
    };

    // update session
    const insertParams = () => {
        const sessionPayload = {
            name: dataObject.name,
            status: dataObject.status
        }
        return sessionPayload
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
        const sessionPayload = insertParams()
        try {
            const res = await postDataRequest(SESSION_URL, sessionPayload);
            if (res?.status === 200) {
                messageModalRef.current.showSuccessConfirmsAutoClose(res.data?.message || t("Saved Successfully"), () => {
                    form.resetFields(); // ✅ clears all fields
                    setDataObject({ name: "", status: true });
                    getListSession();
                    setIsSubmit(false)
                }, "", true);
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

    // get session Id
    const getSessionById = async () => {
        try {
            setLoading(true);
            await getDataRequest(`${SESSION_URL}/${id && id}`)
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
        if (id && id) { getSessionById() }
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
            const sessionPayload = insertParams()
            setLoading(true);
            await putDataRequest(`${SESSION_URL}/${id && id} `, sessionPayload)
                .then((res) => {
                    if (res.status === 200) {
                        setLoading(false);
                        messageModalRef.current.showSuccessConfirmsAutoClose(res && res.message, () => {
                            if (id) {
                                form.resetFields(); // ✅ clears all fields
                                setDataObject({ name: "", status: true });
                                setId("")
                                setIsSubmit(false)
                            }
                            getListSession();
                        }, "", true);

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
        <Form
            form={form}
            layout="vertical"
            style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
        >

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Name<span style={{ color: "red" }}> *</span></span>}
                name="name"
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <InputComponent
                    size="middle"
                    status={isSubmit && !dataObject.name && "error"}
                    value={dataObject.name}
                    setValue={(value) => {
                        setDataObject({ ...dataObject, name: value })
                        form.setFieldValue("name", value);
                    }}
                />
            </Form.Item>
            {/* Centered Save button */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Button type="primary" onClick={id ? handleUpdate : handleSubmit} style={{ width: "30%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                    Save
                </Button>
            </div>
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </Form>
    );
}
export default AddSession