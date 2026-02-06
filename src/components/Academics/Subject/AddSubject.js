
import { Button, Form, Input, Radio, } from "antd";
import { useEffect, useRef, useState } from "react";
import InputComponent from "../../input/InputComponent";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";
import { useTranslation } from "react-i18next";
import { getDataRequest, postDataRequest, putDataRequest } from "../../../api/serviceMethods";
import {  SUBJECT_URL } from "../../../api/URLs";

const AddSubject = ({ getListSubject, id, setId, setLoading }) => {
    const messageModalRef = useRef('');
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false)
    const { t } = useTranslation();
    const [dataObject, setDataObject] = useState({
        name: "",
        type: "theory",
        code: "",
    });

    const checkError = () => {
        if (!dataObject.name || !dataObject.type) {
            return "Please fill in all required fields."
        }
        return false
    }

    const addNewValue = (data) => {
        setDataObject({
            name: data?.name,
            type: data?.type,
            code: data?.code
        });

        // IMPORTANT: sync AntD form
        form.setFieldsValue({
            name: data?.name,
            type: data?.type,
            code: data?.code
        });
    };

    // update section
    const insertParams = () => {
        const sectionPayload = {
            name: dataObject.name,
            type: dataObject.type,
            code: dataObject.code
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
            const res = await postDataRequest(SUBJECT_URL, sectionPayload);
            if (res?.status === 200) {
                messageModalRef.current.showSuccessConfirmsAutoClose(res.data?.message || t("Saved Successfully"), () => {
                    form.resetFields(); // ✅ clears all fields
                    setDataObject({ name: "", type: "theory", code: "" });
                    getListSubject();
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

    // get section Id
    const getSectionById = async () => {
        try {
            setLoading(true);
            await getDataRequest(`${SUBJECT_URL}/${id && id}`)
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
            await putDataRequest(`${SUBJECT_URL}/${id && id} `, sectionPayload)
                .then((res) => {
                    if (res.status === 200) {
                        setLoading(false);
                        messageModalRef.current.showSuccessConfirmsAutoClose(res && res.message, () => {
                            if (id) {
                                form.resetFields(); // ✅ clears all fields
                                setDataObject({ name: "", type: "theory", code: "" });
                                setId("")
                                setIsSubmit(false)
                            }
                            getListSubject();
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
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Subject Name<span style={{ color: "red" }}> *</span></span>}
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

            <Form.Item
                name="type"
                style={{ marginBottom: 12 }}
            >
                <Radio.Group
                    value={dataObject.type} // default "theory"
                    defaultValue="theory"
                    onChange={(e) => {
                        const val = e.target.value; // ← get the selected value
                        setDataObject({ ...dataObject, type: val });
                        form.setFieldValue("type", val);
                    }}
                    options={[
                        { value: "theory", label: "Theory" },
                        { value: "practical", label: "Practical" },
                    ]}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Subject Code</span>}
                name="code"
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <InputComponent
                    size="middle"
                    value={dataObject.code}
                    setValue={(value) => {
                        setDataObject({ ...dataObject, code: value })
                        form.setFieldValue("code", value);
                    }}
                />
            </Form.Item>

            {/* Centered Save button */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Button type="primary" onClick={id ? handleUpdate : handleSubmit} style={{ width: "30%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                    {id ? "Update" : "Save"}
                </Button>
            </div>
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </Form>
    );
}
export default AddSubject