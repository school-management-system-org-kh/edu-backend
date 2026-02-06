import { Card, Col, Row, Button, Flex, Tooltip } from "antd";

const AddonCard = () => {
    const addonData = [
        {
            title: "Smart School Thermal Print",
            img: require("../../../assets/ThermalPrint.jpg"),
            description: "Thermal Print addon adds Thermal Printer compatible small size fees receipt print capability in Smart School. Using this module you can utilize modern cost effective fees receipt printing in Smart School.",
            version: "Version 1.0",
            button: "Install"
        },
        {
            title: "Smart School Quick Fees Create",
            img: require("../../../assets/googlezoom.jpg"),
            description: "Quick Fees Create addon adds one click fees create feature in Smart School Fees Collection module. Using this you can create and assign fees on students in just few seconds and all Fees Category, Fees Groups, Fees Masters will be create automatically in your Smart School.",
            version: "Version 1.0",
            button: "Uninstall"
        },
        {
            title: "Smart School QR Code Attendance",
            img: require("../../../assets/onlineCourse.jpg"),
            description: "QR Code Attendance addon adds automated Student/Staff attendance using QR/Barcode module in Smart School. Using this module Student/Staff can submit their attendance by just scanning their ID Card.",
            version: "Version 2.0",
            button: "Install"
        },
        {
            title: "Smart School Two Factor Authentication",
            img: require("../../../assets/onlineCourse.jpg"),
            description: "Two Factor Authentication addon adds Two Factor Authentication module in Smart School. Using this module you can enhance login security of your Smart School users.",
            version: "Version 2.0",
            button: "Install"
        }
    ];
    // Utility function to truncate text
    const truncateText = (text, maxLength = 100) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };


    return (
        <Row gutter={[24, 24]} style={{ marginTop: 20 }}>
            {addonData.map((addon, index) => (
                <Col key={index} span={8}>
                    <Flex gap="middle" align="start" vertical>
                        <Card style={{ width: 400 }}>
                            <Card.Meta
                                title={addon.title}
                                avatar={<img
                                    alt={addon.title}
                                    src={addon.img}
                                    style={{ height: 120, objectFit: "cover" }}
                                />}
                                description={
                                    <>
                                        <Tooltip title={addon.description} placement="topLeft">
                                            <p style={{ marginBottom: 8 }}>
                                                {truncateText(addon.description, 80)}
                                            </p>
                                        </Tooltip>
                                        <div className="" style={{ display: "flex", justifyContent: "space-between" }}>
                                            <p><strong>{addon.version}</strong></p>
                                            <Button size="small" danger={addon.button === "Install"} type={addon.button === "Install" ? "primary" : "default"}>
                                                {addon.button}
                                            </Button>
                                        </div>
                                    </>
                                }
                            />
                        </Card>
                    </Flex>
                </Col>
            ))}
        </Row>
    );
};

export default AddonCard;
