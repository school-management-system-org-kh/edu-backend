import React, { useState } from "react";
import { Card, Divider } from "antd";

const themes = [
    { key: "default", label: "Default", img: require("../../../assets/theme_default.jpg") },
    { key: "yellow", label: "Yellow", img: require("../../../assets/theme_yellow.jpg") },
    { key: "darkgray", label: "Dark Gray", img: require("../../../assets/theme_darkgray.jpg") },
    { key: "bold_blue", label: "Bold Blue", img: require("../../../assets/theme_bold_blue.jpg") },
    { key: "shadow_white", label: "Shadow White", img: require("../../../assets/theme_shadow_white.jpg") },
    { key: "material_pink", label: "Material Pink", img: require("../../../assets/theme_material_pink.jpg") },
];

const CurrentTheme = () => {
    const [selectedTheme, setSelectedTheme] = useState("default");

    const handleSelect = (key) => {
        setSelectedTheme(key);
    };

    return (
        <div style={{ paddingTop: 10, paddingBottom: 20 }}>
            <Divider orientation="left" orientationMargin="0">
                Current Theme
            </Divider>
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
                            style={{ width: "100%", display: "block", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                        />
                        <div
                            style={{
                                width: "100%", // full width of the card
                                backgroundColor: selectedTheme === theme.key ? "#1890ff" : "#f0f0f0",
                                color: selectedTheme === theme.key ? "#fff" : "#000",
                                padding: "8px 0", // vertical padding
                                fontWeight: 500,
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

export default CurrentTheme;
