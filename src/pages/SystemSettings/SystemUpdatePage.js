import { Row, Col, Card, Tag } from "antd";
import { useTranslation } from "react-i18next";

const SystemUpdatePage = () => {
    const { t } = useTranslation();
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{fontWeight:600, fontSize:"1.25rem"}}>{t("System Update")}</span>} style={{ height: '15rem' }}>
                    <div>
                        <Tag color="green" style={{
                            textAlign: 'center',
                            margin: "auto",
                            paddingTop: "1.2rem",
                            width: "40%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <div className="">
                                <span style={{ fontWeight: 500, fontSize: "1.3rem" }}>{t("Your STEMMentor Admin Version")}</span>
                                <p className="mt-3" style={{ fontWeight: 500, fontSize: "1.3rem" }}>7.1.0</p>
                            </div>
                        </Tag>
                        <p style={{ textAlign: 'center', fontSize: "1rem", fontWeight: 500, marginTop:"0.5rem" }}>{t("Please Check")} <span onClick={() => console.log("view")} style={{ color: "#0085b5", fontWeight: 600, cursor:"pointer" }}>{t("Changelog")}</span> {t("For Latest Version Update.")}</p>
                    </div>
                </Card>
            </Col>
        </Row>
    );
};

export default SystemUpdatePage;
