
import { Button, Form, message, } from "antd";
import { useEffect, useRef, useState } from "react";
import { ROLE_URL } from "../../../api/URLs";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";
import { getDataRequest, postDataRequest, putDataRequest } from "../../../api/serviceMethods";
import { useTranslation } from "react-i18next";
import InputComponent from "../../input/InputComponent";

const Role = ({ getListRole, id, setId, setLoading }) => {
    const messageModalRef = useRef('');
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false)
    const { t } = useTranslation();
    const [dataObject, setDataObject] = useState({
        name: "",
        type: "",
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

    // update role
    const insertParams = () => {
        const rolePayload = {
            name: dataObject.name,
            status: dataObject.status
        }
        return rolePayload
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
        const rolePayload = insertParams()
        try {
            const res = await postDataRequest(ROLE_URL, rolePayload);
            if (res?.status === 200) {
                messageModalRef.current.showSuccessConfirmsAutoClose(res.data?.message || t("Saved Successfully"), () => {
                    form.resetFields(); // ✅ clears all fields
                    setDataObject({ name: "", status: true });
                    getListRole();
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

    // get role Id
    const getRoleById = async () => {
        try {
            setLoading(true);
            await getDataRequest(`${ROLE_URL}/${id && id}`)
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
            message.error('Server Error!');
        }
    }
    useEffect(() => {
        if (id && id) { getRoleById() }
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
            const rolePayload = insertParams()
            setLoading(true);
            await putDataRequest(`${ROLE_URL}/${id && id} `, rolePayload)
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
                            getListRole();
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
            console.log("error", error)
            setLoading(false);
            message.error('Server Error!');
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
export default Role