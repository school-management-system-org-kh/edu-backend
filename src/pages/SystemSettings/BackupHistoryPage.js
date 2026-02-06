import { Card, Col, Row, Tag } from "antd";
import BackupHistoryTable from "../../components/SetupSetting/BackupHistory/BackupHistoryTable";
import UploadDrag from "../../components/SetupSetting/Addons/UploadDrag";
import { useRef, useState } from "react";
import { CopyOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import MessageConfirmModal from "../../components/Modals/MessageConfirmModal";

const BackupHistoryPage = () => {
    const [secretKey, setSecretKey] = useState(nanoid(32));
    const [showKey, setShowKey] = useState(false);
    const messageModalRef = useRef('');

    const regenerateKey = () => {
        setSecretKey(nanoid(32)); // generates new key
        setShowKey(false);        // optional: hide when regenerated
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(secretKey)
            .then(() => {
                messageModalRef.current.showSuccessConfirmsAutoClose("Table copied to clipboard!", () => { }, "", true);
            })
            .catch(() => {
                messageModalRef.current.showWarningConfirm("Table copied to clipboard!", () => { }, "", true);
            });
    };


    return (
        <Row gutter={24}>
            <Col span={15}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Backup History</span>} style={{ height: 'auto' }}>
                    <BackupHistoryTable />
                </Card>
            </Col>
            <Col span={9}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Upload From Local Directory</span>} style={{ height: 'auto' }}>
                    <UploadDrag width="100%" />
                </Card>
                <Card
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Cron Secret Key</span>
                            <Tag color="#727272" style={{ cursor: "pointer" }} onClick={regenerateKey}>Regenerate</Tag>
                        </div>
                    }
                    style={{ height: 'auto', marginTop: 20 }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <span style={{ fontFamily: "monospace", color: "#1890ff" }}>
                            {showKey ? secretKey : ""}
                        </span>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                            {/* Copy icon only shows when key is visible */}
                            {showKey && (
                                <CopyOutlined
                                    style={{ fontSize: 16, color: "#595959", cursor: "pointer" }}
                                    onClick={handleCopy}
                                    title="Copy to clipboard"
                                />
                            )}

                            {/* Eye toggle */}
                            {showKey ? (
                                <EyeOutlined
                                    style={{ fontSize: 16, cursor: "pointer" }}
                                    onClick={() => setShowKey(false)}
                                    title="Hide key"
                                />
                            ) : (
                                <EyeInvisibleOutlined
                                    style={{ fontSize: 16, cursor: "pointer" }}
                                    onClick={() => setShowKey(true)}
                                    title="Show key"
                                />
                            )}
                        </div>
                    </div>
                </Card>
            </Col>
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </Row>
    )
}
export default BackupHistoryPage;