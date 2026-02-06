import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdAdd } from "react-icons/io";
import SMSTemplete from "../../components/Communicate/SMSTemplete";
import { getDataRequest } from "../../api/serviceMethods";
import { SMSTEMPLETE_URL } from "../../api/URLs";

const SMSTempletePage = () => {
    const { t } = useTranslation()
    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false)
    const [keyword, setkeyword] = useState('');
    const [id, setId] = useState("")
    const [show, setShow] = useState(false)

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
    });

    // for list all role
    const getSMSTempletes = async (value) => {
        setLoading(true);
        await getDataRequest(`${SMSTEMPLETE_URL}`, {
            pageNo: tableParams.pagination.current,
            pageSize: tableParams.pagination.pageSize,
            search: value ? value.trim() : "",
        }).then((res) => {
            if (res.status === 200) {
                setData(res?.data);
            }
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res.total,
                },
            });
            setLoading(false);
        }).catch((err) => {
            setLoading(false)
            console.log("Error", err)
        });
    };

    const [isSearch, setIsSearch] = useState(true)
    useEffect(() => {
        isSearch && getSMSTempletes(keyword)
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters), isSearch
    ]);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (isSearch) getSMSTempletes(keyword);
        }, 3000);

        return () => clearTimeout(delay);
    }, [keyword]);

    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card
                    title={
                        <div className="" style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{t("SMS Template")}</span>
                            <Button
                                onClick={() => setShow(true)}
                                icon={<IoMdAdd />} size="middle" style={{ fontSize: "1rem", fontWeight: 500 }} >
                                Add SMS Templete
                            </Button>
                        </div>
                    }
                >
                    <SMSTemplete
                        show={show}
                        setShow={setShow}
                        data={data} setData={setData}
                        t={t}
                        tableParams={tableParams}
                        setTableParams={setTableParams}
                        loading={loading} setLoading={setLoading}
                        setkeyword={setkeyword} keyword={keyword}
                        id={id} setId={setId} getSMSTemplete={getSMSTempletes}
                    />
                </Card>
            </Col>
        </Row>
    )
}
export default SMSTempletePage;