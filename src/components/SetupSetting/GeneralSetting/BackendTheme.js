import React, { useState } from "react";
import { Card } from "antd";

const themes = [
    { key: "default", label: "Default", img: require("../../../assets/backend_them.jpg") },
    { key: "yellow", label: "Yellow", img: require("../../../assets/backend_them1.jpg") },
    { key: "darkgray", label: "Dark Gray", img: require("../../../assets/screenshot.png") },
    { key: "bold_blue", label: "Bold Blue", img: require("../../../assets/school1.jpg") },
    { key: "shadow_white", label: "Shadow White", img: require("../../../assets/result.webp") },
    { key: "material_pink", label: "Material Pink", img: require("../../../assets/dashbord.jpg") },
];

const BackendTheme = () => {
    const [selectedTheme, setSelectedTheme] = useState("default");

    const handleSelect = (key) => {
        setSelectedTheme(key);
    };

    return (
        <div style={{ paddingTop: 10, paddingBottom: 20 }}>
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
                            style={{ width: "100%", height:"8rem", objectFit:"cover", display: "block", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
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
        </div>
    );
};

export default BackendTheme;
