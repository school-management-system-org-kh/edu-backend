import React, { useEffect, useState } from "react";
import { Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";
import "./SwitchLanguage.css";
import { uppercaseText } from "../../utils/validators";

const SwitchLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const languages = [
    { key: "en", name: "English", flag: "us" },
    { key: "cn", name: "Chinese", flag: "cn" },
    { key: "kh", name: "Khmer", flag: "kh" },
  ];

  // ✅ Load default from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang);
    setCurrentLang(savedLang);
  }, []);

  // ✅ Change language when user clicks a menu item
  const handleMenuClick = ({ key }) => {
    i18n.changeLanguage(key);
    setCurrentLang(key);
    localStorage.setItem("lang", key);
  };

  // ✅ Dropdown menu items
  const items = languages.map((lang) => ({
    key: lang.key,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Flag code={lang.flag} style={{ width: 20 }} />
        <span>{lang.name}</span>
      </div>
    ),
  }));

  // ✅ Find current language to display flag + name
  const current = languages.find((l) => l.key === currentLang);

  return (
    <div className="switch_language_body">
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        placement="bottomRight"
        trigger={["click"]}
      >
        <div
          onClick={(e) => e.preventDefault()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          <Flag code={current?.flag || "us"} style={{ width: 24 }} />
          <Space style={{color:"rgba(0,0,0,0.88)"}}>{uppercaseText(current?.key) || "EN"}</Space>
        </div>
      </Dropdown>
    </div>
  );
};

export default SwitchLanguage;
