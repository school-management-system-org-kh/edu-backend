
import { Button, Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";
import SelectMultipleComponent from "../../select/SelectMultipleComponent";
import { getDataRequest, postDataRequest, putDataRequest } from "../../../api/serviceMethods";
import { CLASS_URL, SECTION_URL, SUBJECT_URL, SUBJECTGROUP_URL } from "../../../api/URLs";
import { useTranslation } from "react-i18next";
import InputComponent from "../../input/InputComponent";
import SelectComponent from "../../select/SelectComponent";

const AddSubjectGroup = ({ getListSubjectGroup, id, setId, setLoading }) => {
    const messageModalRef = useRef('');
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false)
    const { t } = useTranslation();
    const [dataObject, setDataObject] = useState({
        name: "",
        classIds: [],
        subjectIds: [],
        sectionIds: [],
        description: ""
    });
    const [options, setOptions] = useState([])
    const [optionClass, setOptionClass] = useState([])
    const [optionSubject, setOptionSubject] = useState([])

    console.log("dataObject", dataObject)


    const checkError = () => {
        if (!dataObject.name || dataObject.classIds.length === 0 || dataObject.sectionIds.length === 0 || dataObject.subjectIds.length === 0) {
            return "Please fill in all required fields."
        }
        return false
    }

    const addNewValue = (data) => {
        const sections = data?.data?.Sections || [];
        const sectionIds = sections.map(s => s.id);
        const classes = data?.data?.Classes || [];
        const classIds = classes.map(c => c.id);
        const subjects = data?.data?.Subjects || [];
        const subjectIds = subjects.map(su => su.id);


        setDataObject({
            name: data?.data?.name || "",
            sectionIds,
            classIds,
            subjectIds,
            description: data?.data?.description || ""
        });

        // sync AntD form
        form.setFieldsValue({
            name: data?.data?.name || "",
            sectionIds,
            classIds,
            subjectIds,
            description: data?.data?.description || "",
        });
    };


    // update section
    const insertParams = () => {
        const sectionPayload = {
            name: dataObject.name,
            sectionIds: dataObject.sectionIds,
            classIds: [dataObject.classIds],
            subjectIds: dataObject.subjectIds,
            description: dataObject.description
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
            const res = await postDataRequest(SUBJECTGROUP_URL, sectionPayload);
            if (res?.status === 200) {
                messageModalRef.current.showSuccessConfirmsAutoClose(res.message || t("Saved Successfully"), () => {
                    form.resetFields(); // ✅ clears all fields
                    setDataObject({ name: "", sectionIds: [], status: true });
                    getListSubjectGroup();
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
            await getDataRequest(`${SUBJECTGROUP_URL}/${id && id}`)
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
            await putDataRequest(`${SUBJECTGROUP_URL}/${id && id} `, sectionPayload)
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
                            getListSubjectGroup();
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

    const getListClass = async (value) => {
        setLoading(true);
        await getDataRequest(`${CLASS_URL}`, {}).then((res) => {
            if (res.status === 200) {
                setOptionClass(res?.data);
            }
            setLoading(false);
        }).catch((err) => {
            setLoading(false)
            console.log("Error", err)
        });
    };


    const getListSubject = async (value) => {
        setLoading(true);
        await getDataRequest(`${SUBJECT_URL}`, {}).then((res) => {
            if (res.status === 200) {
                setOptionSubject(res?.data);
            }
            setLoading(false);
        }).catch((err) => {
            setLoading(false)
            console.log("Error", err)
        });
    };

    useEffect(() => {
        getListSections();
        getListClass();
        getListSubject()
    }, []);


    return (
        <Form
            form={form}
            layout="vertical"
            style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
        >

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Name<span style={{ color: "red" }}> *</span></span>}
                name="name"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a Name") }]}
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
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Class<span style={{ color: "red" }}> *</span></span>}
                name="classIds"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a class") }]}
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <SelectComponent
                    size="middle"
                    variant="filled"
                    status={isSubmit && !(dataObject.classIds?.length > 0) && "error"}
                    value={dataObject.classIds} // IDs are stored for payload
                    setValue={(value) => {
                        setDataObject({ ...dataObject, classIds: value }); // submit IDs
                        form.setFieldValue("classIds", value);
                    }}
                    options={optionClass?.map(s => ({
                        value: s.id,      // this is stored in value (for payload)
                        label: s.name     // this is displayed in dropdown
                    }))}
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

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Subject<span style={{ color: "red" }}> *</span></span>}
                name="subjectIds"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("Please enter a subject") }]}
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <SelectMultipleComponent
                    size="middle"
                    variant="filled"
                    status={isSubmit && !(dataObject.subjectIds?.length > 0) && "error"}
                    value={dataObject.subjectIds} // IDs are stored for payload
                    setValue={(value) => {
                        setDataObject({ ...dataObject, subjectIds: value }); // submit IDs
                        form.setFieldValue("subjectIds", value);
                    }}
                    options={optionSubject?.map(s => ({
                        value: s.id,      // this is stored in value (for payload)
                        label: s.name     // this is displayed in dropdown
                    }))}
                />
            </Form.Item>

            <Form.Item
                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>Description</span>}
                name="description"
                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
            >
                <TextArea
                    rows={3}
                    value={dataObject.description}
                    onChange={(e) => {
                        const val = e.target.value;  // ← FIX HERE
                        setDataObject({ ...dataObject, description: val });
                        form.setFieldValue("description", val);
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
export default AddSubjectGroup