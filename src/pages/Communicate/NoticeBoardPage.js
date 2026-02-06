import { Button, Card, Col, Row } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NoticeBoardTable from "../../components/NoticeBoard/NoticeBoardTable";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NoticeBoardPage = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const [data, setData] = useState("")
    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card
                    title={
                        <div className="" style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("Notice Board")}</span>
                            <Button
                                onClick={() => {
                                    navigate("/communicate/notice-board/add")
                                }}
                                icon={<IoMdAdd />} size="middle" style={{ fontSize: "1rem", fontWeight: 500 }} >
                                Post New Message
                            </Button>
                        </div>
                    }
                    style={{ height: 'auto' }}>
                    <NoticeBoardTable data={data} setData={setData} t={t} />
                </Card>
            </Col>
        </Row>
    )
}
export default NoticeBoardPage;