
import { Button, Form } from "antd";
import { useEffect, useRef, useState } from "react";
import InputComponent from "../../input/InputComponent";
import SelectMultipleComponent from "../../select/SelectMultipleComponent";
import { CLASS_URL, SECTION_URL } from "../../../api/URLs";
import { getDataRequest, postDataRequest, putDataRequest } from "../../../api/serviceMethods";
import { useTranslation } from "react-i18next";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";

const AddClass = ({ getListClass, id, setId, setLoading }) => {
    const messageModalRef = useRef('');
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false)
    const { t } = useTranslation();
    const [dataObject, setDataObject] = useState({
        name: "",
        sectionIds: [],
        status: true
    });
    const [options, setOptions] = useState([])


    const checkError = () => {
        if (!dataObject.name) {
            return "Please fill in all required fields."
        }
        return false
    }

    const addNewValue = (data) => {
        const sections = data?.data?.Sections || [];
        const sectionIds = sections.map(s => s.id);

        setDataObject({
            name: data?.data?.name || "",
            sectionIds,
            status: data?.data?.status ?? true,
        });

        // sync AntD form
        form.setFieldsValue({
            name: data?.data?.name || "",
            sectionIds,
        });
    };


    // update section
    const insertParams = () => {
        const sectionPayload = {
            name: dataObject.name,
            sectionIds: dataObject.sectionIds,
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
            const res = await postDataRequest(CLASS_URL, sectionPayload);
            if (res?.status === 200) {
                messageModalRef.current.showSuccessConfirmsAutoClose(res.message || t("Saved Successfully"), () => {
                    form.resetFields(); // ✅ clears all fields
                    setDataObject({ name: "", sectionIds:[], status: true });
                    getListClass();
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
            await getDataRequest(`${CLASS_URL}/${id && id}`)
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
            await putDataRequest(`${CLASS_URL}/${id && id} `, sectionPayload)
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
                            getListClass();
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

    // for list all role
        const getListSections = async (value) => {
            setLoading(true);
            await getDataRequest(`${SECTION_URL}`, {}).then((res) => {
                if (res.status === 200) {
                    setOptions(res?.data);
                }
                setLoading(false);
            }).catch((err) => {
                setLoading(false)
                console.log("Error", err)
            });
        };
    
        useEffect(() => {
            getListSections();
        }, []);

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
        >

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Class<span style={{ color: "red" }}> *</span></span>}
                name="name"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a class") }]}
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
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Section<span style={{ color: "red" }}> *</span></span>}
                name="sectionIds"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a section") }]}
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <SelectMultipleComponent
                    size="middle"
                    variant="filled"
                    status={isSubmit && !(dataObject.sectionIds?.length > 0) && "error"}
                    value={dataObject.sectionIds} // IDs are stored for payload
                    setValue={(value) => {
                        setDataObject({ ...dataObject, sectionIds: value }); // submit IDs
                        form.setFieldValue("sectionIds", value);
                    }}
                    options={options?.map(s => ({
                        value: s.id,      // this is stored in value (for payload)
                        label: s.name     // this is displayed in dropdown
                    }))}
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
export default AddClass