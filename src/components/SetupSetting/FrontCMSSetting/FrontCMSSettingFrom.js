
import { Button, Checkbox, Col, Input, Row, Select, Switch } from "antd";
import { useState } from "react";
import UploadDrag from "../Addons/UploadDrag";
import CurrentTheme from "./CurrentTheme";

const FrontCMSSettingFrom = () => {
    const { TextArea } = Input;
    const [frontCMS, setFrontCMS] = useState(true)
    const [sidebar, setSidebar] = useState(true)
    const [languageMode, setLanguageMode] = useState(true)
    const options = [
        { label: 'News', value: 'news' },
        { label: 'Complainar', value: 'complainar', }
    ];
    const onChange = checkedValues => {
        console.log('checked = ', checkedValues);
    };

    const handleSave = () => {
    };

    return (
        <div className="">
            <Row gutter={24}>
                <Col span={12}>
                    <Row gutter={[24, 24]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={10} style={{ fontSize: "1rem", fontWeight: 500 }}>Front CMS</Col>
                        <Col span={14}><Switch value={frontCMS} onChange={(e) => { setFrontCMS(e) }} /></Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={10} style={{ fontSize: "1rem", fontWeight: 500 }}>Sidebar</Col>
                        <Col span={14}><Switch value={sidebar} onChange={(e) => { setSidebar(e) }} /></Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={10} style={{ fontSize: "1rem", fontWeight: 500 }}>Language RTL Text Mode</Col>
                        <Col span={14}><Switch value={languageMode} onChange={(e) => { setLanguageMode(e) }} /></Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={10} style={{ fontSize: "1rem", fontWeight: 500 }}>Sidebar Option</Col>
                        <Col span={14}><Checkbox.Group options={options} defaultValue={['news', 'complainar']} onChange={onChange} /></Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={10} style={{ fontSize: "1rem", fontWeight: 500 }}>Language</Col>
                        <Col span={14}>
                            <Select
                                placeholder="Select Language"
                                style={{ width: "100%" }}
                                size="middle"
                                allowClear={true}
                                options={[
                                    { value: "english", label: "English" },
                                    { value: "khmer", label: "Khmer" },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "start" }}>
                        <Col span={10} style={{ fontSize: "1rem", fontWeight: 500 }}>Logo (369px X 76px)</Col>
                        <Col span={14}>
                            <UploadDrag width={"100%"} />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "start" }}>
                        <Col span={10} style={{ fontSize: "1rem", fontWeight: 500 }}>Favicon (32px X 32px)</Col>
                        <Col span={14}>
                            <UploadDrag width={"100%"} />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={10} style={{ fontSize: "1rem", fontWeight: 500 }}>Footer Text</Col>
                        <Col span={14}>
                            <Input placeholder="Enter Footer Text" defaultValue="© SmartMentor Admin School 2025 All rights reserved" size="middle" />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "start" }}>
                        <Col span={10} style={{ fontSize: "1rem", fontWeight: 500 }}>Cookie Consent</Col>
                        <Col span={14}>
                            <TextArea rows={4} />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "start" }}>
                        <Col span={10} style={{ fontSize: "1rem", fontWeight: 500 }}>Cookie Consent</Col>
                        <Col span={14}>
                            <TextArea rows={4} defaultValue={`<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
                                <script>
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());

                                gtag('config', 'GA_TRACKING_ID');
                                </script>`}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={8} style={{ fontSize: "1rem", fontWeight: 500 }}>WhatsApp URL</Col>
                        <Col span={16}>
                            <Input placeholder="Enter WhatsApp URL" defaultValue="https://www.whatsapp.com/a" size="middle" />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={8} style={{ fontSize: "1rem", fontWeight: 500 }}>Facebook URL</Col>
                        <Col span={16}>
                            <Input placeholder="Enter Facebook URL" defaultValue="https://www.facebook.com/a" size="middle" />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={8} style={{ fontSize: "1rem", fontWeight: 500 }}>Twitter URL</Col>
                        <Col span={16}>
                            <Input placeholder="Enter Twitter URL" defaultValue="https://twitter.com/a" size="middle" />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={8} style={{ fontSize: "1rem", fontWeight: 500 }}>Youtube URL</Col>
                        <Col span={16}>
                            <Input placeholder="Enter Youtube URL" defaultValue="https://www.youtube.com/a" size="middle" />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={8} style={{ fontSize: "1rem", fontWeight: 500 }}>Google Plus</Col>
                        <Col span={16}>
                            <Input placeholder="Enter Youtube URL" defaultValue="https://www.youtube.com/a" size="middle" />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={8} style={{ fontSize: "1rem", fontWeight: 500 }}>Google Plus</Col>
                        <Col span={16}>
                            <Input placeholder="Enter Google Plus" defaultValue="https://plus.google.com/a" size="middle" />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={8} style={{ fontSize: "1rem", fontWeight: 500 }}>Linkedin URL</Col>
                        <Col span={16}>
                            <Input placeholder="Enter Linkedin URL" defaultValue="https://www.linkedin.com/a" size="middle" />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={8} style={{ fontSize: "1rem", fontWeight: 500 }}>Instagram URL</Col>
                        <Col span={16}>
                            <Input placeholder="Enter Instagram URL" defaultValue="https://www.instagram.com/a" size="middle" />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginBottom: 25, display: "flex", alignItems: "center" }}>
                        <Col span={8} style={{ fontSize: "1rem", fontWeight: 500 }}>Pinterest URL</Col>
                        <Col span={16}>
                            <Input placeholder="Enter Pinterest URL" defaultValue="https://in.pinterest.com/a" size="middle" />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <CurrentTheme/>
            {/* Centered Save button */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Button type="primary" onClick={handleSave} style={{ width: "20%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                    Save
                </Button>
            </div>
        </div>
    );
}
export default FrontCMSSettingFrom