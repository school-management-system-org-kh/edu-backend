import { Row, Col, Card, Divider, Form, Input, Button, InputNumber } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const FileTypesPage = () => {
     const { t } = useTranslation();
    const { TextArea } = Input;
    const [form] = Form.useForm();
    const [allowedExt, setAllowedExt] = useState("");
    const [allowedType, setAllowedType] = useState("");
    const [allowedExtImage, setAllowedExtImage] = useState("");
    const [allowedTypeImage, setAllowedTypeImage] = useState("");
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
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("File Types")}</span>} style={{ height: 'auto' }}>
                    <Divider style={{ fontWeight: 600, fontSize: "1.2rem" }} orientation="left" orientationMargin="0">
                        {t("Setting For Files")}
                    </Divider>
                    <Form
                        form={form}
                        layout="vertical"
                        style={{ rowGap: 12 }} // 👈 reduces spacing for all fields
                    >
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Allowed Extension")}<span style={{ color: "red" }}> *</span></span>}
                            name="allowed_extension"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please enter a allowed extension")) }]}
                            style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                        >
                            <TextArea
                                defaultValue="pdf, zip, jpg, jpeg, png, txt, 7z, gif, csv, docx, mp3, mp4, accdb, odt, ods, ppt, pptx, xlsx, wmv, jfif, apk, ppt, bmp, jpe, mdb, rar, xls, svg, php, html"
                                value={allowedExt}
                                onChange={(e) => setAllowedExt(e.target.value)}
                                rows={6}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Allowed MIME Type")}<span style={{ color: "red" }}> *</span></span>}
                            name="allowed_mime_type"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please enter a allowed MIME type")) }]}
                            style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                        >
                            <TextArea
                                defaultValue="application/pdf, image/zip, image/jpg, image/png, image/jpeg, text/plain, application/x-zip-compressed, application/zip, image/gif, text/csv, application/vnd.openxmlformats-officedocument.wordprocessingml.document, audio/mpeg, application/msaccess, application/vnd.oasis.opendocument.text, application/vnd.oasis.opendocument.spreadsheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, video/x-ms-wmv, video/mp4, image/jpeg, application/vnd.android.package-archive, application/x-msdownload, application/vnd.ms-powerpoint, image/bmp, image/jpeg, application/msaccess, application/vnd.ms-excel, image/svg+xml, image/php"
                                value={allowedType}
                                onChange={(e) => setAllowedType(e.target.value)}
                                rows={6}
                            />
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Upload Size (In Bytes)")}<span style={{ color: "red" }}> *</span></span>}
                            name="upload_size"
                            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please enter upload size (In Bytes)")) }]}
                            style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                        >
                            <InputNumber placeholder={t("Enter Upload Size (In Bytes)")} size="middle"  style={{width:"100%"}}/>
                        </Form.Item>
                        <div className="" style={{ marginTop: "1.5rem" }}>
                            <Divider style={{ fontWeight: 600, fontSize: "1.2rem" }} orientation="left" orientationMargin="0">
                                {t("Setting For Image")}
                            </Divider>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Allowed Extension")}<span style={{ color: "red" }}> *</span></span>}
                                name="allowed_extension"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please enter a allowed extension")) }]}
                                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                            >
                                <TextArea
                                    defaultValue="jfif, png, jpe, jpeg, jpg, bmp, gif, svg"
                                    value={allowedExtImage}
                                    onChange={(e) => setAllowedExtImage(e.target.value)}
                                    rows={6}
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Allowed MIME Type")}<span style={{ color: "red" }}> *</span></span>}
                                name="allowed_mime_type"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please enter a allowed MIME type")) }]}
                                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                            >
                                <TextArea
                                    defaultValue="image/jpeg, image/png, image/jpeg, image/jpeg, image/bmp, image/gif, image/x-ms-bmp, image/svg+xml"
                                    value={allowedTypeImage}
                                    onChange={(e) => setAllowedTypeImage(e.target.value)}
                                    rows={6}
                                />
                            </Form.Item>
                            <Form.Item
                                label={<span style={{ fontSize: "1rem", fontWeight: 500 }}>{t("Upload Size (In Bytes)")}<span style={{ color: "red" }}> *</span></span>}
                                name="upload_size"
                                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(t("Please enter upload size (In Bytes)")) }]}
                                style={{ marginBottom: 12 }} // 👈 reduce bottom spacing
                            >
                                <InputNumber placeholder={t("Enter Upload Size (In Bytes)")} size="middle" style={{width:"100%"}}/>
                            </Form.Item>
                        </div>
                        {/* Centered Save button */}
                        <div style={{ textAlign: "center", marginTop: "24px" }}>
                            <Button type="primary" onClick={handleSave} style={{ width: "20%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                                {t("Save")}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default FileTypesPage;
