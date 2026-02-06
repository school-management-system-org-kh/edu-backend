import { Card, Col, Row } from "antd";
import AddSession from "../../components/SetupSetting/SessionSetting/AddSession";
import SessionList from "../../components/SetupSetting/SessionSetting/SessionList";
import { getDataRequest } from "../../api/serviceMethods";
import { SESSION_URL } from "../../api/URLs";
import { useEffect, useState } from "react";

const SessionSettingPage = () => {
    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false)
    const [keyword, setkeyword] = useState('');
    const [id, setId] = useState("")

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
    });

    // for list all role
    const getListSessions = async (value) => {
        setLoading(true);
        await getDataRequest(`${SESSION_URL}`, {
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
        isSearch && getListSessions(keyword)
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters), isSearch
    ]);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (isSearch) getListSessions(keyword);
        }, 3000);

        return () => clearTimeout(delay);
    }, [keyword]);

    return (
        <Row gutter={24}>
            <Col span={9}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Add Session</span>} style={{ height: 'auto' }}>
                    <AddSession 
                        getListSession={getListSessions}
                        id={id} setId={setId}
                        loading={loading} setLoading={setLoading}
                        keyword={keyword} setIsSearch={setIsSearch}
                    />
                </Card>
            </Col>
            <Col span={15}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Session List</span>} style={{ height: 'auto' }}>
                    <SessionList 
                        data={data} tableParams={tableParams}
                        setTableParams={setTableParams}
                        loading={loading} setLoading={setLoading}
                        setkeyword={setkeyword} keyword={keyword}
                        id={id} setId={setId}  getListSession={getListSessions}
                    />
                </Card>
            </Col>
        </Row>
    )
}
export default SessionSettingPage;