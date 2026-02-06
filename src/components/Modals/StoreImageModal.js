import { Modal, Button, Card, Input, Pagination } from "antd";
import { useState } from "react";

const StoreImageModal = ({ setShowNew, show, setShow, t }) => {
    const [selectedTheme, setSelectedTheme] = useState("default");

    const handleSelect = (key) => {
        setSelectedTheme(key);
    };

    const handleSave = () => {
        setShow(false);
        setShowNew(true)
    };
    const handleClose = () => {
        setShow(false);
        setShowNew(true)
    };
    const themes = [
        { key: "default", label: "ready-set-school_lm.jpg", img: require("../../assets/backend_them.jpg") },
        { key: "yellow", label: "ready-set-school.jpg", img: require("../../assets/backend_them1.jpg") },
        { key: "darkgray", label: "ready-set-school23.jpg", img: require("../../assets/screenshot.png") },
        { key: "bold_blue", label: "ready-set-school12.png", img: require("../../assets/school1.jpg") },
        { key: "shadow_white", label: "M_Admission-side-banner.png", img: require("../../assets/result.webp") },
        { key: "material_pink", label: "-world-environment-day2.png", img: require("../../assets/dashbord.jpg") },
        { key: "default1", label: "ready-set-school_lm.jpg", img: require("../../assets/acleda_bank.jpg") },
        { key: "yellow1", label: "ready-set-school.jpg", img: require("../../assets/cherry.jpg") },
        { key: "darkgray1", label: "ready-set-school23.jpg", img: require("../../assets/school.jpg") },
        { key: "bold_blue1", label: "ready-set-school12.png", img: require("../../assets/apple.jpg") },
        { key: "shadow_white1", label: "M_Admission-side-banner.png", img: require("../../assets/ant-animal.jpeg") },
        { key: "material_pink1", label: "-world-environment-day2.png", img: require("../../assets/coconut.jpg") },
    ];

    return (
        <Modal
            title={<span style={{ fontSize: "1.2rem" }}>{t("Images")}</span>}
            centered
            open={show}
            footer={null} // hide default footer
            onCancel={handleClose} // ✅ reset + close on X
            width={1400}
        >
            <div style={{ paddingTop: 10, paddingBottom: 20 }}>
                <div className="" style={{ paddingBottom: 20 }}>
                    <Input size="middle" placeholder="Search....." />
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}
                >
                    {themes.map((theme) => (
                        <Card
                            key={theme.key}
                            hoverable
                            onClick={() => handleSelect(theme.key)}
                            style={{
                                width: "calc(16.66% - 13.3px)",
                                border: selectedTheme === theme.key ? "0.15rem solid #1890ff" : undefined,
                                cursor: "pointer",
                            }}
                            className="cus-card"
                        >
                            <img
                                src={theme.img}
                                alt={theme.label}
                                style={{ width: "100%", height: "8rem", objectFit: "cover", display: "block", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                            />
                            <div
                                style={{
                                    width: "100%", // full width of the card
                                    backgroundColor: selectedTheme === theme.key ? "#1890ff" : "#f0f0f0",
                                    color: selectedTheme === theme.key ? "#fff" : "#000",
                                    padding: "8px 0", // vertical padding
                                    fontWeight: 500,
                                    borderBottomLeftRadius: 5, borderBottomRightRadius: 5,
                                    textAlign: "center",
                                }}
                            >
                                {theme.label}
                            </div>
                        </Card>
                    ))}
                </div>
                <Pagination
                    style={{ marginTop: 20 }}
                    total={80}
                    showTotal={total => `Total Record: ${total}`}
                    showSizeChanger={false}
                />
            </div>

            {/* Centered Save button */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Button color="default" variant="filled" onClick={handleSave} style={{ width: "20%", fontSize: "1rem", fontWeight: 600 }} size="middle">
                    Add
                </Button>
            </div>
        </Modal>
    );
};

export default StoreImageModal;
