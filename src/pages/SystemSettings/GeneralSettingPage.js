import { Card, Col, Row } from "antd";
import GeneralSettingMain from "../../components/SetupSetting/GeneralSetting/GeneralSettingMain";
import { useState } from "react";
import GeneralSettingTab from "../../components/SetupSetting/GeneralSetting/GeneralSettingTab";
import LogoTab from "../../components/SetupSetting/GeneralSetting/LogoTab";
import LogoBackgroundTab from "../../components/SetupSetting/GeneralSetting/LogoBackgroundTab";
import BackendTheme from "../../components/SetupSetting/GeneralSetting/BackendTheme";
import MobileAppTab from "../../components/SetupSetting/GeneralSetting/MobileAppTab";
import GuardianPanelTab from "../../components/SetupSetting/GeneralSetting/GuardianPanelTab";
import MaintenanceTab from "../../components/SetupSetting/GeneralSetting/MaintenanceTab";
import MiscellaneousTab from "../../components/SetupSetting/GeneralSetting/MiscellaneousTab";
import WhatsappSettingsTab from "../../components/SetupSetting/GeneralSetting/WhatsappSettingsTab";
import IDAutoGenerationTab from "../../components/SetupSetting/GeneralSetting/IDAutoGenerationTab";
import FeesTab from "../../components/SetupSetting/GeneralSetting/FeesTab";
import AttendanceTypeTab from "../../components/SetupSetting/GeneralSetting/AttendanceTypeTab";

const GeneralSettingPage = () => {
    const [storeTitleMenus, setStoreTitleMenus] = useState("General Setting")
    const menuItems = [
        { key: "general-setting", title: "General Setting", link: "/settings/general" },
        { key: "logo", title: "Logo", link: "#!" },
        { key: "login-bg", title: "Login Page Background", link: "#!" },
        { key: "theme", title: "Backend Theme", link: "#!" },
        { key: "mobile-app", title: "Mobile App", link: "#!" },
        { key: "student-guardian-panel", title: "Student / Guardian Panel", link: "#!" },
        { key: "fees", title: "Fees", link: "#!" },
        { key: "id-auto", title: "ID Auto Generation", link: "#!" },
        { key: "attendance", title: "Attendance Type", link: "#!" },
        { key: "whatsapp", title: "Whatsapp Settings", link: "#!" },
        { key: "maintenance", title: "Maintenance", link: "#!" },
        { key: "misc", title: "Miscellaneous", link: "#!" },
    ];
    return (
        <Row gutter={24}>
            <Col span={5}>
                <GeneralSettingMain menuItems={menuItems} storeTitleMenus={storeTitleMenus} setStoreTitleMenus={setStoreTitleMenus}/>
            </Col>
            <Col span={19}>
                {storeTitleMenus !=="Attendance Type" && <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{storeTitleMenus}</span>} style={{ height: 'auto' }}>
                    {
                        storeTitleMenus === "General Setting" && <GeneralSettingTab />
                    }
                    {
                        storeTitleMenus === "Logo" && <LogoTab />
                    }
                    {
                        storeTitleMenus === "Login Page Background" && <LogoBackgroundTab />
                    }
                    {
                        storeTitleMenus === "Backend Theme" && <BackendTheme />
                    }
                    {
                        storeTitleMenus === "Mobile App" && <MobileAppTab />
                    }
                    {
                        storeTitleMenus === "Student / Guardian Panel" && <GuardianPanelTab />
                    }
                    {
                        storeTitleMenus === "Fees" && <FeesTab />
                    }
                    
                    {
                        storeTitleMenus === "ID Auto Generation" && <IDAutoGenerationTab />
                    }
                    {
                        storeTitleMenus === "Whatsapp Settings" && <WhatsappSettingsTab />
                    }
                    {
                        storeTitleMenus === "Maintenance" && <MaintenanceTab />
                    }
                    {
                        storeTitleMenus === "Miscellaneous" && <MiscellaneousTab />
                    }
                </Card>}
                    {
                        storeTitleMenus === "Attendance Type" && <AttendanceTypeTab />
                    }
            </Col>
        </Row>
    )
}
export default GeneralSettingPage;